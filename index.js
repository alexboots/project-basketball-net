import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './_reducers'
import App from './components/App.js'

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const Root = () => {
  return (
    <Provider store={ store }>
      <App />
    </Provider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))