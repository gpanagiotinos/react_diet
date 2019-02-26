import React from 'react'
import {Route} from 'react-router-dom'
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
        <PrivateRoute exact path="/" component={Home} />
          {
            routes.map((route, index) => (
              <Route
                key={route.key}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))
          }
        </div>
      </div>
    )
  }
}
export default Main