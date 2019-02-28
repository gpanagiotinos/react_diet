import React from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({component: Component, authLogged, ...rest}) => (
  <Route {...rest} render={(props) => {
    return authLogged.loggedIn ? <Component {...props}/> : <Redirect to={{ pathname: '/login', state: {from: props.location}}} />
  }} />
)
PrivateRoute.propTypes = {
  authLogged: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired
}
function mapStateToProps(state, props) {
  return {
    authLogged: state.initialState
  }
}
export default  withRouter(connect(mapStateToProps, null, null, {pure: false})(PrivateRoute))