import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => {
    console.log(props)
    return props.isLogged ? <Component {...props}/> : <Redirect to={{ pathname: '/login', state: {from: props.location}}} />
  }} />
)
function mapStateToProps(state) {
  console.log(state.initialState)
  const { isLogged } = state.initialState
  return {
    isLogged
  }
}
export default connect(mapStateToProps)(PrivateRoute)