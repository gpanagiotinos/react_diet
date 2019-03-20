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
    this.handleActiveCurrentPage = this.handleActiveCurrentPage.bind(this)
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
              this.handlePaginationNumbers().map((button) => {
                if (button.visible === 'number') {
                  return (
                    <li key={button.index}>
                      <Button value={button.index} buttonCustomClass={'pagination-link ' + this.handleActiveCurrentPage(button.index)} label={button.buttonText} onButtonClick={this.handlePaginationChange}/>
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
    const paginationPages = Math.ceil(this.props.paginationData.total/this.props.paginationData.limit)
    let paginationButtonsArray = []
    if (paginationPages > 10) {
      const middlePaginationPages = Math.ceil(paginationPages/2)
      for (let index = 1; index <= paginationPages; index++) {
        const element = {}
        if (index < 2) {
          element = {index: index, buttonText: index, visible: 'number'}
          paginationButtonsArray.push(element)
          paginationButtonsArray.push({index: 'separator_' + index, buttonText: '...', visible: 'separator' })
        } else if (index === paginationPages ) {
          element = {index: index, buttonText: index, visible: 'number'}
          paginationButtonsArray.push(element)
        } else if (index === middlePaginationPages) {
          element = {index: index, buttonText: index, visible: 'number'}
          paginationButtonsArray.push(element)
        } else if (index === (middlePaginationPages + 1)) {
          element = {index: index, buttonText: index, visible: 'number'}
          paginationButtonsArray.push(element)
          paginationButtonsArray.push({index: 'separator_' + index, buttonText: '...', visible: 'separator' })
        } else if (index === (middlePaginationPages - 1)) {
          element = {index: index, buttonText: index, visible: 'number'}
          paginationButtonsArray.push(element)
        } else {
          element = {index: index, buttonText: index, visible: false}
          paginationButtonsArray.push(element)
        }
      }
    } else {
      for (let index = 1; index <= paginationPages; index++) {
        const element = {index: index, buttonText: index, visible: 'number'}
        paginationButtonsArray.push(element)
      }
    }
    return paginationButtonsArray
  }
  handleActiveCurrentPage (index) {
    if (index === (this.props.paginationData.currentPagination + 1)) {
      return 'is-current'
    } else {
      return ''
    }
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
  console.log(paginationData)
  return {paginationData}
}
export default connect(mapStateToProps)(Pagination)