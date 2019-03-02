import { combineReducers } from 'redux'

import { AUTH_STATE_UPDATE, AUTH_ERROR } from '../actions/auth'

export const authReducer = (state = { authenicated: false }, action) => {
  switch (action.type) {
    case AUTH_STATE_UPDATE:
      return { ...state, authenicated: action.authenicated }
    case AUTH_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}

const reducers = combineReducers({
  auth: authReducer
})

export default reducers
