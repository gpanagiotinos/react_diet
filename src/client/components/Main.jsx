import React from 'react'
import {Route, Switch} from 'react-router-dom'
import routes from '../router/route.js'
import PrivateRoute from './PrivateRoute.jsx'
import Home from './Home.jsx'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className='columns is-multiline is-mobile mainWrapper'>
        <div className='column is-12'>
        <Switch>
          <PrivateRoute exact path="/" component={Home} authLogged={{loggedIn: false, user: null}} />
            {
              routes().map((route, index) => {
                if (route.role.indexOf('all') !== -1) {
                  return <Route
                    key={route.key}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                } else {
                  return <PrivateRoute
                    key={route.key}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                />
                }
              })
            }
          </Switch>
        </div>
      </div>
    )
  }
}
export default Main