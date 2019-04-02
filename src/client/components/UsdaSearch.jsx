import React from 'react'
import Input from '../ui-components/Input.jsx'
import DropDown from '../ui-components/DropDown.jsx'
import Button from '../ui-components/Button.jsx'
import Table from '../ui-components/Table.jsx'
import Pagination from '../ui-components/Pagination.jsx'
import {connect} from 'react-redux'
import {usdaActions} from '../redux/actions'

class UsdaSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usdaSearch: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonChange = this.handleButtonChange.bind(this)
  }
  componentDidMount () {
    const dispatch = this.props.dispatch
    dispatch(usdaActions.usdaListDropDown('groups', 'foodGroup', null))
  }
  handleInputChange(e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
  })
  }
  handleButtonChange(e) {
    const dispatch = this.props.dispatch
    dispatch(usdaActions.usdaSearch(this.state.usdaSearch, 0))
  }

  render () {
    return (
      <div className='columns is-multiline is-mobile is-centered'>
        <div className='column is-half'>
            <Input type='search' label={'Search USDA'} name='usdaSearch' value={this.state.searchValue} onInputChange={this.handleInputChange}/>
          <div className='field'>
            <DropDown dropDownId={'foodGroup'} buttonLabel={'Food Groups'}/>
          </div>
          <div className='field'>
            <Button label='Search' bulmaType='link' onButtonClick={this.handleButtonChange}/>
          </div>
        </div>
        <div className='column is-12'>
          <Table/>
        </div>
        <div className='column is-12'>
          <Pagination/>
        </div>
      </div>
    )
  }
}
export default connect()(UsdaSearch)