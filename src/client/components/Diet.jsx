import React from 'react'
import DropDown from '../ui-components/DropDown.jsx'
import MediaObject from '../ui-components/MediaObject.jsx'
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
    this.handleSelectFood = this.handleSelectFood.bind(this)
    this.handleDietMenu = this.handleDietMenu.bind(this)
    this.handleDietMenuFields = this.handleDietMenuFields.bind(this)
  }
  componentDidMount () {
    const dispatch = this.props.dispatch
    dispatch(usdaActions.usdaListDropDown('groups', 'foodGroup', null))
  }
  handleInputSearch(value) {
    const dispatch = this.props.dispatch
    if (value.length > 2) {
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
    if (this.state.inputSearchValue.length > 2) {
      dispatch(usdaActions.usdaListDropDown('searchFood', 'searchFood', null, this.state.inputSearchValue, value.id))
    }
  }
  handleSelectFood(e, value) {
    const dispatch = this.props.dispatch
    dispatch(usdaActions.usdaNutritionMediaObject(value.id))
  }
  handleDietMenu () {
    return (<div className='card'>
    <div className='card-content'>
      <p className='title is-4'>Menu</p>
      <div className='column is-12'>
        <div className='columns is-multiline is-mobile'>
          {this.handleDietMenuFields()}
        </div>
      </div>
      </div>
    <div className='content'>
      <div className='column is-12'>
        <div className='columns is-multiline'>
          <MediaObject key={'menu'} />
        </div>
      </div>
    </div>
  </div>)
  }
  handleDietMenuFields () {
    return this.props.menuItem.map((field, index) => {
      return (<div key={index} className='column field has-addons'>
        <p className='control'>
            <a className='button is-link'>{field.name}</a>
        </p>
        <p className='control'>
            <a className='button is-static'>{field.value}</a>
        </p>
        <p className='control'>
          <a className='button is-link'>{field.measure}</a>
        </p>
      </div>)
    })
  }
  render () {
    return (
      <div className='columns is-multiline is-mobile'>
        <div className='column is-10 is-offset-1 field has-addons'>
            <div className='control is-expanded'>
              <DropDown key={'searchFood'} dropDownId={'searchFood'} dropdownType='input' onDropDownInput={this.handleInputSearch} onDropDownSelect={this.handleSelectFood}/>
            </div>
            <div className='control'>
              <DropDown key={'foodGroup'} dropDownId={'foodGroup'} buttonLabel={'Food Groups'} onDropDownSelect={this.handleSelectFoodGroup}/>
            </div>
        </div>
        <div className='column is-10 is-offset-1'>
          {this.handleDietMenu()}
        </div>
      </div>
    )
  }
}
function mapStateToProps (state, props) {
  const {menuItem} = state.menu
  console.log({menuItem})
  return {menuItem}
}
export default connect(mapStateToProps)(Diet)