import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../../client/components/app.jsx'

const render = (initialState) => {
  let content = renderToString(<App />)
  return {content}
}
module.exports = render