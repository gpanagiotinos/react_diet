import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Redirect} from 'react-router-dom'
import {userActions} from '../redux/actions'
import PropTypes from 'prop-types'

class Logout extends React.Component {
  componentWillMount () {
    this.props.dispatch(userActions.logout())
  }
  render () {
    return null
  }
}
Logout.propTypes = {
  dispatch: PropTypes.func.isRequired
}
export default withRouter(connect()(Logout))