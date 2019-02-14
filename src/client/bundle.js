import React from 'react'
import {render} from 'react-dom'

import {StaticRouter} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory({basename: '/'})

import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'

import App from './components/App.jsx'

const store = configureStore()

render(
    <Provider store= {store}>
        <StaticRouter history = {browserHistory}>
            <App/>
        </StaticRouter>
    </Provider>,
    document.getElementById('app')
)