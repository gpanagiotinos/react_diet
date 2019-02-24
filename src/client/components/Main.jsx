import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import routes from '../router/route.js'

class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className='columns is-multiline is-mobile mainWrapper'>
        <div className='column is-12'>
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