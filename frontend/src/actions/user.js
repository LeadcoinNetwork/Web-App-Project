import types from "./types"

export default {
  logIn() {
    return {
      type: types.LOG_IN,
    }
  },
  loggedIn(user) {
    return {
      type: types.LOGGED_IN,
      payload: user,
    }
  },

  logOut() {
    return {
      type: types.LOG_OUT,
    }
  },

  loggedOut() {
    return {
      type: types.LOGGED_OUT,
    }
  },
}
