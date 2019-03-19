import React from 'react'
import {connect} from 'react-redux'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeNext: true,
      activePrevious: true,
      currentPage: 0
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
              <li></li>
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
    for (let index = 1; index <= paginationPages; index++) {
      const element = {index: index, buttonText: index}
    }
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