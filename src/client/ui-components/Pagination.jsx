import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from '../ui-components/Button.jsx'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeNext: true,
      activePrevious: true,
      buttonsArray: []
    }
    this.handlePaginationComponent = this.handlePaginationComponent.bind(this)
    this.handlePaginationNumbers = this.handlePaginationNumbers.bind(this)
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
  }
  handlePaginationComponent () {
    if (this.props.paginationData !== undefined) {
      if (Object.keys(this.props.paginationData).length > 0 && this.props.paginationData.constructor === Object) {
        return (
          <nav className='pagination is-centered' role='navigation' aria-label='pagination'>
          <Button value={'previous'} buttonCustomClass={'pagination-previous'} label={'Previous'} onButtonClick={this.handlePaginationChange}/>
          <Button value={'next'} buttonCustomClass={'pagination-next'} label={'Next'} onButtonClick={this.handlePaginationChange}/>
            <ul className='pagination-list'>
            {
              this.handlePaginationNumbers().map((button, index) => {
                if (button.visible === 'number') {
                  return (
                    <li key={index}>
                      <Button key={button.index}  value={button.index} buttonCustomClass={'pagination-link ' + button.isCurrent} label={button.buttonText} onButtonClick={this.handlePaginationChange}/>
                    </li>
                  )
                } else if (button.visible === 'separator') {
                  return (<li key={button.index}>
                    <span className='pagination-ellipsis'>{button.buttonText}</span>
                  </li>)
                } else {
                  return (null)
                }
              })
            }
            </ul>
          </nav>
        )
      } else {
        return (null)
      }
    } else {
      return (null)
    }
  }
  handlePaginationNumbers () {
    const paginationPages = Math.ceil(this.props.paginationData.total/(this.props.paginationData.limit - this.props.paginationData.offset))
    let paginationButtonsArray = []
    if (paginationPages > 10 && (paginationPages - this.props.paginationData.currentPagination) > 10) {
      const middlePaginationPages = Math.round((paginationPages + this.props.paginationData.currentPagination)/2)
      const currentPaginationText = this.props.paginationData.currentPagination === 0 ? 1 : this.props.paginationData.currentPagination
      paginationButtonsArray = new Array(
        {index: this.props.paginationData.currentPagination, buttonText: currentPaginationText, visible: 'number', isCurrent: 'is-current'},
        {index: 'separator_1', buttonText: '...', visible: 'separator'},
        {index: (middlePaginationPages - 1), buttonText: (middlePaginationPages - 1), visible: 'number', isCurrent: ''},
        {index: middlePaginationPages, buttonText: middlePaginationPages, visible: 'number', isCurrent: ''},
        {index: (middlePaginationPages + 1), buttonText: (middlePaginationPages + 1), visible: 'number', isCurrent: ''},
        {index: 'separator_2', buttonText: '...', visible: 'separator'},
        {index: paginationPages, buttonText: paginationPages, visible: 'number', isCurrent: ''}
      )
    } else {
      for (let index = 1; index <= paginationPages; index++) {
        const element = {index: index, buttonText: index, visible: 'number'}
        paginationButtonsArray.push(element)
      }
    }
    console.log(paginationButtonsArray)
    return paginationButtonsArray
  }
  handlePaginationChange(e, value) {
    let offset = 1
    switch (value) {
      case 'next':
        offset = ((this.props.paginationData.currentPagination + 1) * (this.props.paginationData.limit - this.props.paginationData.offset))
        break;
      case 'previous':
        offset = ((this.props.paginationData.currentPagination - 1) * (this.props.paginationData.limit - this.props.paginationData.offset))
        break;
      default:
        offset = ((value) * (this.props.paginationData.limit - this.props.paginationData.offset))
        break;
    }
    const args = {...this.props.paginationData.actionArgs}
    args['offset'] = offset
    const dispatch = this.props.dispatch
    dispatch(this.props.paginationData.paginationAction.apply(null, Object.keys(args).map((key) => {
      return args[key]
    })))
  }
  render () {
    return (this.handlePaginationComponent())
  }
}
function mapStateToProps(state) {
  const paginationData = {...state.pagination}
  return {paginationData}
}
export default connect(mapStateToProps)(Pagination)