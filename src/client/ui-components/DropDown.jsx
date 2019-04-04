import React from 'react'
import Button from '../ui-components/Button.jsx'
import Input from '../ui-components/Input.jsx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux'
import {dropdownActions} from '../redux/actions'

class DropDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      buttonLabel: this.props.buttonLabel,
      dropdownType: this.props.dropdownType === undefined ? 'default':this.props.dropdownType,
      iconLabel: this.props.iconLabel,
      dropDownId: this.props.dropDownId,
      content: this.props.content,
      dropdownActive: false,
      dropdownSelected: false,
      onDropDownSelect: this.props.onDropDownSelect,
      onDropDownInput: this.props.onDropDownInput,
      inputValue: ''
    }
    this.handleDropDownContent = this.handleDropDownContent.bind(this)
    this.handleDropDownActive = this.handleDropDownActive.bind(this)
    this.handleDropDownSelection = this.handleDropDownSelection.bind(this)
    this.handleDropDownTrigger = this.handleDropDownTrigger.bind(this)
    this.handleDropDownInput = this.handleDropDownInput.bind(this)
  }
  handleDropDownContent () {
    if (this.props.content !== undefined) {
      const contentArray = [...this.props.content]
      return contentArray.map((dropdownItem, index) => {
        if (index == this.props.selectedIndex) {
          return (<Button buttonCustomClass={'dropdown-item is-active'} key={dropdownItem.id + 'is_active'} onButtonClick={this.handleDropDownSelection} value={index} label={dropdownItem.name}/>)
        } else {
          return (<Button buttonCustomClass={'dropdown-item'} key={dropdownItem.id} onButtonClick={this.handleDropDownSelection} value={index} label={dropdownItem.name}/>)
        }
      })
    } else if (this.state.dropdownActive) {
      return (<Button buttonCustomClass={'dropdown-item button'} loadingButton={true} key={'loading'}/>)
    }
  }
  handleDropDownSelection (e, value) {
    e.preventDefault()
    const dispatch = this.props.dispatch
    if (this.props.selectedIndex === null || this.props.selectedIndex !== value.toString()) {
      this.setState((prevState, props) => ({
        buttonLabel: props.content[value].name,
        dropdownActive: false,
        dropdownSelected: !prevState.dropdownSelected
      }))
      dispatch(dropdownActions.dropdownSelect(value.toString(), this.state.dropDownId, true))
      this.state.onDropDownSelect(e, this.props.content[value])
    } else {
      this.setState((prevState, props) => ({
        buttonLabel: props.buttonLabel,
        dropdownActive: false,
        dropdownSelected: !prevState.dropdownSelected
      }))
      this.state.onDropDownSelect(e, null)
      dispatch(dropdownActions.dropdownSelect(value.toString(), this.state.dropDownId, false))
    }
  }
  handleDropDownActive () {
    this.setState((prevState, props) => ({
      dropdownActive: !prevState.dropdownActive
    }))
  }
  handleDropDownInput (e) {
    const {value} = e.target
    this.setState((prevState, props) => ({
      dropdownActive: true,
      inputValue: value
    }))
    this.state.onDropDownInput(value)
  }
  handleDropDownTrigger () {
    switch (this.state.dropdownType) {
      case 'default':
        return (<div className='dropdown-trigger'>
          <Button key={this.state.buttonLabel} onButtonClick={this.handleDropDownActive} label={this.state.buttonLabel} rightIcon={'angle-down'}/>
          </div>)
      case 'input':
        return (
            <Input value={this.state.inputValue} onInputChange={this.handleDropDownInput}/>
        )
    }
  }
  render () {
    return (
      <div className={'dropdown is-fullwidth' + [this.state.dropdownActive ? ' is-active': '']}>
          {this.handleDropDownTrigger()}
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
    const filterData = state.dropdown.dropdownData.filter((data) => {
      return data.id === props.dropDownId
    })
    if (filterData.length > 0) {
      const content = filterData[0].data
      const selectedIndex = filterData[0].selectedIndex
      const requestResolved = filterData[0].requestResolved
      return {content, selectedIndex, requestResolved}
    } else {
      return {}
    }

}
export default connect(mapStateToProps)(DropDown)