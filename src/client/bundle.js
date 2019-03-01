import React from 'react'
import {render} from 'react-dom'

import {Router} from 'react-router-dom'
// import createBrowserHistory from 'history/createBrowserHistory'
// const browserHistory = createBrowserHistory({basename: '/'})
import {history} from '../client/redux/helpers'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import './assets/scss/main.scss'
import App from './components/App.jsx'

const state = window.__STATE__
delete window.__STATE__

const store = configureStore(state)
render(
    <Provider store= {store}>
        <Router history = {history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app')
)