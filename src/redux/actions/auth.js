import { apiWrapper } from '../../services/api'
import { setUser } from './user'

export const AUTH_STATE_UPDATE = 'AUTH_STATE_UPDATE'
export const AUTH_ERROR = 'AUTH_ERROR'

// Basic action, returns an object
export const updateAuth = authenicated => ({
  type: AUTH_STATE_UPDATE,
  authenicated
})

export const setError = err => ({
  type: AUTH_ERROR,
  error: err
  // whatever else
})

// this action handles an async call using thunk
export const register = (email, password, name) => {
  return dispatch => {
    apiWrapper('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        name
      })
    })
      .then(res => {
        console.log(res)
        dispatch(setUser(res))
        dispatch(updateAuth(true))
      })
      .catch(err => {
        console.error(err)
        dispatch(setError(err))
      })
  }
}

export const login = (email, password) => {
  return dispatch => {
    apiWrapper('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => {
        dispatch(setUser(res))
        dispatch(updateAuth(true))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const me = () => {}
