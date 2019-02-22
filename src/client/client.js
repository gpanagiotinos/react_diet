import React from 'react'
import {hydrate} from 'react-dom'

import {Router} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory({basename: '/'})

import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import './assets/scss/main.scss'
import App from './components/App.jsx'

const state = window.__STATE__
delete window.__STATE__

const store = configureStore()

hydrate(
    <Provider store= {store}>
        <Router history={browserHistory}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app')
)