import React from 'react'
import Button from '../ui-components/Button.jsx'
import { connect } from 'react-redux'

class DropDownContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: this.props.content,
      DropDownContentID: this.props.DropDownContentID
    }
    this.handleDropDownSelection = this.handleDropDownSelection.bind(this)
  }
  handleDropDownSelection() {

  }
  handleDropDownContent () {
    console.log(this.props.content)
    if (this.props.content.length > 0) {
      return this.props.content.map((item, index) => {
        return (<Button buttonCustomClass={'dropdown-item'} key={item.id} onButtonClick={this.handleDropDownSelection} value={index} label={item.name}/>)
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