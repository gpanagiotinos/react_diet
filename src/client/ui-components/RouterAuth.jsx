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
  componentDidMount () {
    this.handleRouterAuth()
  }
  handleRouterAuth() {
  const authRoutes = routes.filter((route) => {
      return route.role.indexOf(this.props.user.role) > -1 || route.role === 'all'
    })
  console.log(authRoutes)
  }
  render () {
    return (
      routes.map((route) => (
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
  const {user} = {...state.authentication, ...state.initialState}
  return {
    user
  }
}
export default withRouter(connect(mapStateToProps)(RouterAuth))