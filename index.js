import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './_reducers'
import App from './components/App.js'

const store = createStore(reducers)

const Root = () => {
  return (
    <Provider store={ store }>
      <App />
    </Provider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))