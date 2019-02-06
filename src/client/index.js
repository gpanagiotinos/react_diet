import React from 'react'
import {hydrate} from 'react-dom'
import App from './components/app.jsx'

hydrate(<App />, document.getElementById('app'))