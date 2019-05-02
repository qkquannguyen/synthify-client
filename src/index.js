import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './redux/reducers'
import { updateAuth } from './redux/actions/auth'
import { getPlaylists } from './redux/actions/services'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#Example_5_Check_a_cookie_existence
if (
  document.cookie.split(';').filter(item => item.trim().startsWith('token='))
    .length
) {
  // we have a cookie
  // redirect accordingly
  store.dispatch(updateAuth(true))
  // fetch the profile here
  // store.dispatch(getPlaylists())
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
