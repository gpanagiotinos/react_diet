import React from 'react'
import Button from '../ui-components/Button.jsx'
import { connect } from 'react-redux'
import {dropdownActions} from '../redux/actions'

class DropDownContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: this.props.content,
      DropDownContentID: this.props.DropDownContentID
    }
    this.handleDropDownSelection = this.handleDropDownSelection.bind(this)
  }
  handleDropDownSelection(e, value) {
    const dispatch = this.props.dispatch
    dispatch(dropdownActions.dropdownSelectItem(this.state.DropDownContentID, this.props.content[value]))
  }
  handleDropDownContent () {
    console.log(this.props.content)
    if (this.props.content.length > 0) {
      return this.props.content.map((item, index) => {
        return (<Button buttonCustomClass={'dropdown-item'} buttonId={item.id} key={item.id} onButtonClick={this.handleDropDownSelection} value={index} label={item.name}/>)
      })
    } else {
      return (<Button buttonCustomClass={'dropdown-item button'} loadingButton={true} key={'loading'}/>)
    }
  }
  render () {
    return (
      <div id={this.state.DropDownContentID} className='dropdown-content'>
        {this.handleDropDownContent()}
      </div>
    )
  }
}
function mapStateToProps(state, props) {
  return {}
}
export default connect(mapStateToProps)(DropDownContent)