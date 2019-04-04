import React from 'react'
import Input from '../ui-components/Input.jsx'
import DropDown from '../ui-components/DropDown.jsx'
import Button from '../ui-components/Button.jsx'
import Table from '../ui-components/Table.jsx'
import {connect} from 'react-redux'
import {usdaActions} from '../redux/actions'

class Diet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputSearchValue: '',
      foodGroupID: ''
    }
    this.handleInputSearch = this.handleInputSearch.bind(this)
    this.handleSelectFoodGroup = this.handleSelectFoodGroup.bind(this)
  }
  componentDidMount () {
    const dispatch = this.props.dispatch
    dispatch(usdaActions.usdaListDropDown('groups', 'foodGroup', null))
  }
  handleInputSearch(value) {
    const dispatch = this.props.dispatch
    if (value.length > 5) {
      dispatch(usdaActions.usdaListDropDown('searchFood', 'searchFood', null, value, this.state.foodGroupID))
      this.setState((prevState, props) => ({
        inputSearchValue: value
      }))
    }
  }
  handleSelectFoodGroup(e, value) {
    this.setState((prevState, props) => ({
      foodGroupID: value.id
    }))
    const dispatch = this.props.dispatch
    if (this.state.inputSearchValue.length > 5) {
      dispatch(usdaActions.usdaListDropDown('searchFood', 'searchFood', null, this.state.inputSearchValue, value.id))
    }
  }
  render () {
    return (
      <div className='columns is-mobile'>
        <div className='column is-10 is-offset-1 field has-addons'>
            <div className='control is-expanded'>
              <DropDown dropDownId={'searchFood'} dropdownType='input' onDropDownInput={this.handleInputSearch}/>
            </div>
            <div className='control'>
              <DropDown dropDownId={'foodGroup'} buttonLabel={'Food Groups'} onDropDownSelect={this.handleSelectFoodGroup}/>
            </div>
        </div>
      </div>
    )
  }
}
export default connect()(Diet)