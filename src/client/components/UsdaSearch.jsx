import React from 'react'
import Input from '../ui-components/Input.jsx'
import DropDown from '../ui-components/DropDown.jsx'
import Button from '../ui-components/Button.jsx'
import Table from '../ui-components/Table.jsx'
import Pagination from '../ui-components/Pagination.jsx'
import {connect} from 'react-redux'
import {usdaActions, tableActions} from '../redux/actions'
import {GetUSDAData} from '../services/apollo.service.js'

class UsdaSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usdaSearch: '',
      foodGroup: '',
      queryData: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleButtonChange = this.handleButtonChange.bind(this)
    this.handleGroupSelect = this.handleGroupSelect.bind(this)
    this.handleLoadingButton = this.handleLoadingButton.bind(this)
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
    // dispatch(usdaActions.usdaSearch(this.state.usdaSearch, this.state.foodGroup, 0))
    dispatch(tableActions.addTableHead(['Name', 'Group', 'Description', 'Food ID', 'Manufacture']))
    dispatch(tableActions.addTableBody({action: GetUSDAData, data: [this.state.usdaSearch, this.state.foodGroup, 0, 25 ,'TableBodyRow'
    ]}))
    this.setState((prevState, props) => ({
      loadingButton: true
    }))
  }
  handleGroupSelect(e, value) {
    if (value !== null) {
      this.setState((prevState, props) => ({
        foodGroup: value.id.toString(),
      }))
    } else {
      this.setState((prevState, props) => ({
        foodGroup: '',
      }))
    }
  }
  handleLoadingButton () {
    if (this.props.requestResolved !== undefined && this.props.requestResolved === false) {
      return true
    } else {
      return false
    }
  }
  render () {
    return (
      <div className='columns is-multiline is-mobile is-centered'>
        <div className='column is-half'>
            <Input type='search' label={'Search USDA'} name='usdaSearch' value={this.state.searchValue} onInputChange={this.handleInputChange}/>
          <div className='field'>
            <DropDown onDropDownSelect={this.handleGroupSelect} dropDownId={'foodGroup'} buttonLabel={'Food Groups'}/>
          </div>
          <div className='field'>
            <Button key={'searchButton'} label='Search' bulmaType='link' loadingButton = {this.handleLoadingButton()} onButtonClick={this.handleButtonChange}/>
          </div>
        </div>
        <div className='column is-12'>
          <Table />
        </div>
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  const {requestResolved} = state.table
  return {requestResolved}
}
export default connect(mapStateToProps)(UsdaSearch)