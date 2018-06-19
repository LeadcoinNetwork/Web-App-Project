import * as types from "./types"

export const logIn = () => ({
  type: types.LOG_IN,
})
export const loggedIn = user => ({
  type: types.LOGGED_IN,
  payload: user,
})

export const logOut = () => ({
  type: types.LOG_OUT,
})

export const loggedOut = () => ({
  type: types.LOGGED_OUT,
})
