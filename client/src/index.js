import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// redux
import { createStore, applyMiddleware, compose } from 'redux'
import { reducers } from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import './index.css'

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  {},
  composeEnchancer(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
