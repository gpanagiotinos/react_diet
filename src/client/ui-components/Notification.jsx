import React from 'react'
import {connect} from 'react-redux'
import {alertActions} from '../redux/actions'
class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.handleNotification = this.handleNotification.bind(this)
    this.handleDisplay = this.handleDisplay.bind(this)
    this.handleDeleteNotification = this.handleDeleteNotification.bind(this)
  }
  handleNotification() {
    if (this.props.alert !== undefined && this.props.alert !== null && Object.keys(this.props.alert).length > 0) {
      setTimeout(() => {
        this.props.dispatch(alertActions.clear())
      }, 3000)
      return(
        <div className={'column is-half notification ' + this.props.alert.type}>
          <button className='delete' onClick={this.handleDeleteNotification}></button>
          {this.props.alert.message}
        </div>
      )
    } else {
      return null
    }
  }
  handleDisplay () {
    if (this.props.alert !== undefined && this.props.alert !== null && Object.keys(this.props.alert).length > 0) {
      return null
    } else {
      return 'appDisplayNone'
    }
  }
  handleDeleteNotification () {
    this.props.dispatch(alertActions.clear())
  }
  render () {
    return (
      <div className={'columns is-mobile is-centered notificationWrapper ' + this.handleDisplay()}>
        {this.handleNotification()}
      </div>
    )
  }
}
function mapStateToProps(state, props) {
  const alert = {...state.alert}
  return {alert: alert}
}
export default connect(mapStateToProps)(Notification)