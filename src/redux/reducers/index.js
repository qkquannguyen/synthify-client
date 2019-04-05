import { combineReducers } from 'redux'

import { AUTH_STATE_UPDATE, AUTH_ERROR } from '../actions/auth'
import { SET_USER } from '../actions/user'
import { SET_PLAYLISTS } from '../actions/services'

// A reducer with our basic true/false state
export const authReducer = (
  state = { authenicated: false, user: null },
  action
) => {
  // each action has a type
  switch (action.type) {
    // we get a matching type
    case AUTH_STATE_UPDATE:
      // we return a copy of the new state
      return { ...state, authenicated: action.authenicated }
    case AUTH_ERROR:
      return { ...state, error: action.error }
    // we didn't get a matching action
    default:
      return state
  }
}

const user = {
  email: null,
  name: null
}

const services = {
  names: null,
  playlists: null
}

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, email: action.user.email, name: action.user.name }

    default:
      return state
  }
}

export const servicesReducer = (state = services, action) => {
  switch (action.type) {
    case SET_PLAYLISTS:
      return { ...state, playlists: action.playlists, names: action.services }

    default:
      return state
  }
}

// This will allow us to split up reducers later once our application grows
const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  services: servicesReducer
})

export default reducers
