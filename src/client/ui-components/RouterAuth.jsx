import React from 'react'
import RouterLink from './RouterLink.jsx'
import routes from '../router/route.js'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class RouterAuth extends React.Component {
  constructor (props) {
    super(props)
    this.handleRouterAuth = this.handleRouterAuth.bind(this)
  }
  handleRouterAuth() {
  const user = {...this.props.user}
  if (user !== null && user.role !== undefined) {
    const role = user.role
    return routes.filter((route) => {
      return (route.role.indexOf(role) > -1 || route.role.indexOf('all') > -1) && route.key !== 'login'
    })
  } else {
    return []
  }
  }
  render () {
    return (
      this.handleRouterAuth().map((route) => (
        <RouterLink
            navLinkClassName='navbar-item'
            key= {route.key}
            to={route.path}
            text={route.name}
        />
      ))
    )
  }
}

function mapStateToProps(state) {
  console.log('routerauth: ', state)
  const {user} = {...state.authentication}
  return {
    user
  }
}
export default withRouter(connect(mapStateToProps)(RouterAuth))