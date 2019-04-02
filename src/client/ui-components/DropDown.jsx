import React from 'react'
import Button from '../ui-components/Button.jsx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux'
import {dropdownActions} from '../redux/actions'

class DropDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      buttonLabel: this.props.buttonLabel,
      iconLabel: this.props.iconLabel,
      dropDownId: this.props.dropDownId,
      content: this.props.content,
      dropdownActive: false,
      dropdownSelected: false
    }
    this.handleDropDownContent = this.handleDropDownContent.bind(this)
    this.handleDropDownActive = this.handleDropDownActive.bind(this)
    this.handleDropDownSelection = this.handleDropDownSelection.bind(this)
  }
  handleDropDownContent () {
    if (this.props.content !== undefined) {
      const contentArray = [...this.props.content]
      return contentArray.map((dropdownItem, index) => {
        if (index == this.props.selectedIndex) {
          return <Button buttonCustomClass={'dropdown-item is-active'} key={dropdownItem.id + 'is_active'} onButtonClick={this.handleDropDownSelection} value={index} label={dropdownItem.name}/> 
        } else {
          return <Button buttonCustomClass={'dropdown-item'} key={dropdownItem.id} onButtonClick={this.handleDropDownSelection} value={index} label={dropdownItem.name}/> 
        }
      })
    }
  }
  handleDropDownSelection (e, value) {
    this.setState((prevState, props) => ({
      buttonLabel: props.content[value].name,
      dropdownActive: false,
      dropdownSelected: !prevState.dropdownSelected
    }))
    const dispatch = this.props.dispatch
    if (this.props.selectedIndex === null || this.props.selectedIndex !== value.toString()) {
      dispatch(dropdownActions.dropdownSelect(value.toString(), this.state.dropDownId, true))
    } else {
      dispatch(dropdownActions.dropdownSelect(value.toString(), this.state.dropDownId, false))
    }
  }
  handleDropDownActive () {
    this.setState((prevState, props) => ({
      dropdownActive: !prevState.dropdownActive
    }))
  }
  render () {
    return (
      <div className={'dropdown' + [this.state.dropdownActive ? ' is-active': '']}>
        <div className='dropdown-trigger'>
          <Button key={this.state.buttonLabel} onButtonClick={this.handleDropDownActive} label={this.state.buttonLabel} rightIcon={'angle-down'}/>
        </div>
          <div className='dropdown-menu'>
            <div className='dropdown-content'>
              {this.handleDropDownContent()}
            </div>
          </div>
      </div>
    )
  }
}
function mapStateToProps(state, props) {
  console.log(state.dropdown)
  if (state.dropdown.requestResolved && state.dropdown.requestResolved !== undefined) {
    const filterData = state.dropdown.dropdownData.filter((data) => {
      return data.id === props.dropDownId
    })
    const content = filterData[0].data
    const selectedIndex = filterData[0].selectedIndex 
    return {content, selectedIndex}
  } else {
    return {}
  }
}
export default connect(mapStateToProps)(DropDown)