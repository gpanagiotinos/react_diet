import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../../client/components/App.jsx'

import {Provider} from 'react-redux'
import configureStore from '../../client/redux/configureStore.js'
import {StaticRouter} from 'react-router-dom'
import {client} from '../../client/apollo/apollo.service.js'
import {ApolloProvider} from 'react-apollo'

const render = (initialState, context, req) => {
  const store = configureStore(initialState)
  let content = renderToString(
    <Provider store= {store}>
      <ApolloProvider client={client}>
        <StaticRouter context={ context } location={ req.url }>
              <App/>
          </StaticRouter>
      </ApolloProvider>
    </Provider>
  )
  const preloadedState = store.getState()
  return {content, preloadedState}
}
export {render}