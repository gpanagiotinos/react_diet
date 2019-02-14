import React from 'react'
import {hydrate} from 'react-dom'

import {StaticRouter} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory({basename: '/'})

import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'

import App from './components/App.jsx'

const state = window.__STATE__
delete window.__STATE__

const store = configureStore()

hydrate(
    <Provider store= {store}>
        <StaticRouter>
            <App/>
        </StaticRouter>
    </Provider>,
    document.getElementById('app')
)