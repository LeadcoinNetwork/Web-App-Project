import * as types from "./types"

export const loggedIn = user => ({
  type: types.LOGGED_IN,
  payload: user,
})

export const loggedOut = () => ({
  type: types.LOGGED_OUT,
})
