import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from '../ui-components/Button.jsx'
import Input from '../ui-components/Input.jsx'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paginationInputValue: null
    }
    this.handlePaginationComponent = this.handlePaginationComponent.bind(this)
    this.handlePaginationNumbers = this.handlePaginationNumbers.bind(this)
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
    this.handlePreviousNextDisable = this.handlePreviousNextDisable.bind(this)
    this.handlePaginationOnInputChange = this.handlePaginationOnInputChange.bind(this)
  }
  handlePaginationComponent () {
    if (this.props.paginationData !== undefined) {
      if (Object.keys(this.props.paginationData).length > 0 && this.props.paginationData.constructor === Object) {
        return (
          <nav className='pagination is-centered' role='navigation' aria-label='pagination'>
          <Button key={'previous'} value={'previous'} disable={() => this.hanlePreviousNextDisable('previous')} buttonCustomClass={'pagination-previous'} label={'Previous'} onButtonClick={this.handlePaginationChange}/>
          <Button key={'next'} value={'next'} disable={() => this.hanlePreviousNextDisable('next')} buttonCustomClass={'pagination-next'} label={'Next'} onButtonClick={this.handlePaginationChange}/>
            <ul className='pagination-list'>
            {
              this.handlePaginationNumbers().map((button, index) => {
                if (button.visible === 'number') {
                  return (
                    <li key={index}>
                      <Button key={button.index + button.isCurrent}  value={button.index} buttonCustomClass={'pagination-link ' + button.isCurrent} label={button.buttonText} onButtonClick={this.handlePaginationChange}/>
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
            <li className='field has-addons'>
              <div className='control'>
                <Input type='number' size='1' onInputChange = {this.handlePaginationOnInputChange} value={this.state.paginationInputValue}/>
              </div> 
              <div className='control'>
                <Button buttonCustomClass={'button'} label='Go' onButtonClick={(e) => (this.handlePaginationChange(e, parseInt(this.state.paginationInputValue)))}/>
              </div>
            </li>
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
    console.log('number', paginationPages)
    const currentPaginationPages = (paginationPages - this.props.paginationData.currentPagination)
    let paginationButtonsArray = []
    if (currentPaginationPages > 10) {
      const middlePaginationPages = Math.round((paginationPages + this.props.paginationData.currentPagination)/2)
      const currentPaginationText = this.props.paginationData.currentPagination
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
      const startPagination = paginationPages > 10 ? (paginationPages - 10) : 1 
      for (let index = startPagination; index <= paginationPages; index++) {
        const element = {}
        element = {...{index: index, buttonText: index, visible: 'number', isCurrent: ''}, isCurrent: index === this.props.paginationData.currentPagination ? 'is-current' : ''}
        paginationButtonsArray.push(element)
      }
    }
    return paginationButtonsArray
  }
  handlePaginationChange(e, value) {
    let nextPagination = 1
    switch (value) {
      case 'next':
        nextPagination = (this.props.paginationData.currentPagination + 1)
        break;
      case 'previous':
        nextPagination = (this.props.paginationData.currentPagination - 1)
        break;
      default:
        nextPagination = value
        break;
    }
    const paginationPages = Math.ceil(this.props.paginationData.total/(this.props.paginationData.limit - this.props.paginationData.offset))
    if (nextPagination > paginationPages || nextPagination < 1) {
      nextPagination = this.props.paginationData.currentPagination
    }
    const args = {...this.props.paginationData.actionArgs}
    // based on button clicked count the offset
    const offset = Math.max(...[...Array(nextPagination).keys()].map((key) => {
      return (key*(this.props.paginationData.limit - this.props.paginationData.offset))
    }))
    args['offset'] = offset
    const dispatch = this.props.dispatch
    dispatch(this.props.paginationData.paginationAction.apply(null, Object.keys(args).map((key) => {
      return args[key]
    })))
  }
  handlePreviousNextDisable (button) {
    const paginationPages = Math.ceil(this.props.paginationData.total/(this.props.paginationData.limit - this.props.paginationData.offset))
    switch (button) {
      case 'next':
      return this.props.paginationData.currentPagination === paginationPages ? true : false
      case 'previous':
      return this.props.paginationData.currentPagination === 0 ? true : false
    }
  }
  render () {
    return (this.handlePaginationComponent())
  }
  handlePaginationOnInputChange(e) {
    const {value} = e.target
    this.setState((prevState, props) => {
      return {paginationInputValue: value}
    })
  }
}
function mapStateToProps(state) {
  const paginationData = {...state.pagination}
  return {paginationData}
}
export default connect(mapStateToProps)(Pagination)