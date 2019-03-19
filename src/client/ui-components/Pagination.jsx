import React from 'react'
import {connect} from 'react-redux'
import Button from '../ui-components/Button.jsx'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeNext: true,
      activePrevious: true,
      currentPage: 0,
      buttonsArray: []
    }
    this.handlePaginationComponent = this.handlePaginationComponent.bind(this)
    this.handlePaginationNumbers = this.handlePaginationNumbers.bind(this)
  }
  handlePaginationComponent () {
    if (this.props.paginationData !== undefined) {
      if (Object.keys(this.props.paginationData).length > 0 && this.props.paginationData.constructor === Object) {
        return (
          <nav className='pagination is-centered' role='navigation' aria-label='pagination'>
          <a className='pagination-previous'>Previous</a>
          <a className='pagination-next'>Next</a>
            <ul className='pagination-list'>
            {
              this.handlePaginationNumbers().map((button) => {
                if (button.visible) {
                  return (
                    <li key={button.index}>
                      <Button  label={button.buttonText}/>
                    </li>
                  )
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
    const middlePaginationPages = Math.ceil(paginationPages/2)
    let paginationButtonsArray = []
    for (let index = 1; index <= paginationPages; index++) {
      const element = {}
      if (index < 2) {
        element = {index: index, buttonText: index, visible: true}
      } else if (index === paginationPages ) {
        element = {index: index, buttonText: index, visible: true}
      } else if (index === middlePaginationPages) {
        element = {index: index, buttonText: index, visible: true}
      } else if (index === (middlePaginationPages + 1) || index === (middlePaginationPages - 1)) {
        element = {index: index, buttonText: index, visible: true}
      } else {
        element = {index: index, buttonText: index, visible: false}
      }
      paginationButtonsArray.push(element)
    }
    return paginationButtonsArray
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