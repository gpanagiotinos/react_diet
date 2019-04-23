import React from 'react'
import DropDown from '../ui-components/DropDown.jsx'
import MediaObject from '../ui-components/MediaObject.jsx'
import {connect} from 'react-redux'
import {usdaActions} from '../redux/actions'
import {GetUSDAData} from '../apollo/apollo.service.js'

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
      GetUSDAData('searchFood', 'searchFood', null, value, this.state.foodGroupID)
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
    let menuContent = [
      {id: '255', name: 'Water', value: 0, measure: 'g'},
      {id: '208', name: 'Energy', value: 0, measure: 'kcal'},
      {id: '268', name: 'Energy', value: 0, measure: 'kj'},
      {id: '203', name: 'Protein', value: 0, measure: 'g'},
      {id: '204', name: 'Fat', value: 0, measure: 'g'},
      {id: '205', name: 'Cardohydrate', value: 0, measure: 'g'},
      {id: '291', name: 'Fiber', value: 0, measure: 'g'},
      {id: '269', name: 'Sugar', value: 0, measure: 'g'}
    ]
    if (this.props.items !== undefined) {
      menuContent = [...menuContent.map((field) => {
         this.props.items.forEach((item) => {
           item.content.forEach((nutrient) => {
            if (field.id === nutrient.nutrient_id) {
              const calculateValue = ((parseFloat(nutrient.value) * item.value) / 100)
              field = {...field, value: field.value + calculateValue}
            }
          })
        })
        return field
      })]
    }
    return menuContent.map((field, index) => {
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
        <div className='column is-2'>
          <div className='column is-12'>
            <div className='columns is-multiline is-mobile'>
              {this.handleDietMenuFields()}
            </div>
          </div>
        </div>
        <div className='column is-9'>
          {this.handleDietMenu()}
        </div>
      </div>
    )
  }
}
function mapStateToProps (state, props) {
  console.log(state)
  const {items} = state.menu
  return {items}
}
export default connect(mapStateToProps)(Diet)