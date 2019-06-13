import React from 'react'
import DropDown from '../ui-components/DropDown.jsx'
import Button from '../ui-components/Button.jsx'
import {connect} from 'react-redux'
import {GET_USDADATA} from '../apollo/apollo.tags.js'
import {dropdownActions} from '../redux/actions'

class Chef extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      DietsArray: [],
      foodGroupID: '',
      foodSearch: null,
      contentSearch: {}
    }
    this.handleAddNewDiet = this.handleAddNewDiet.bind(this)
    this.handleDisplayNewDiet = this.handleDisplayNewDiet.bind(this)
    this.handleInputSearch = this.handleInputSearch.bind(this)
    this.handleDietItems = this.handleDietItems.bind(this)
  }
  handleAddNewDiet (e) {
    this.setState((prevState, props) => {
      const diet = {name: `Menu ${prevState.DietsArray.length}`, id: 'new-diet-' + prevState.DietsArray.length}
      return {
        DietsArray: [...prevState.DietsArray, diet]
      }
    })
  }
  handleDisplayNewDiet () {
    return this.state.DietsArray.map((item) => {
      return (<div id={item.id} key={item.id} className='tile is-child is-4'>
        <div className='content NewMenu'>
          <h1 className='title'>{item.name}</h1>
          <div className='field is-grouped is-grouped-multiline'>
          {
            this.handleDietItems(item.id)
          }
          </div>
        </div>
    </div>)
    })
  }
  handleDietItems (id) {
    const Items = this.props.menuItems[id] !== undefined ? [...this.props.menuItems[id]] : []
    return Items.map((item) => {
      return (
        <div key={item.ndbno} className='control'>
          <div className='tags has-addons'>
            <a className='tag is-link'>{item.name}</a>
            <a className="tag is-delete"></a>
          </div>
        </div>
      )
    })
  }
  handleInputSearch (value, id) {
    this.setState((prevState, props) => {
      return {
        foodSearch: value
      }
    })
    const QueryObject = {query: GET_USDADATA, args: {text: value, foodGroup: this.state.foodGroupID, offset: 0, max: 25}}
    this.props.dispatch(dropdownActions.dropdownQuery(QueryObject, id, this.state.DietsArray[0].id))
  }
  render () {
    return (
      <div className='columns is-multiline is-mobile'>
        <div className='column is-10 is-offset-1 field has-addons'>
          <div className='control is-expanded'>
            <DropDown key={'search-input'} dropDownId={'search-input'} dropdownType='input' onDropDownInput={this.handleInputSearch} />
          </div>
          <div className='control is-expanded'>
            <DropDown key={'food-group'} dropDownId={'food-group'} buttonLabel={'Food Group'}/>
          </div>
        </div>
        <div className='column is-12'>
          <div className='tile is-ancestor'>
            <div className='tile is-parent'>
              <div className='tile is-child is-4'>
                <div className='content'>
                  <Button buttonCustomClass={'addNewDietButton'} onButtonClick={this.handleAddNewDiet} buttonId={'add-new-diet'} key={'add-new-diet'} labelIcon={'plus'}/>
                </div>
              </div>
              {this.handleDisplayNewDiet()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, props) {
  const menuItems = {...state.dropdown.dropdownData.byHash}
  console.log(menuItems)
  return {menuItems}
}

export default connect(mapStateToProps)(Chef)