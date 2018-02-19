import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App.js'

const Root = () => {
  return (
    <App />
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))