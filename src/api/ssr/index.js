import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../../client/components/app.jsx'

import {Provider} from 'react-redux'
import configureStore from '../../client/redux/configureStore.js'

import {StaticRouter} from 'react-router-dom'

const render = (initialState) => {
  const store = configureStore(initialState)
  let content = renderToString(
    <Provider store= {store}>
      <StaticRouter>
          <App/>
      </StaticRouter>
    </Provider>
  )
  return {content}
}
module.exports = render