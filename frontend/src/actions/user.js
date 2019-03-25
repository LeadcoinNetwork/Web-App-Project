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

  editWallet(wallet) {
    return {
      type: types.EDIT_WALLET,
      payload: wallet,
    }
  },

  loggedOut() {
    return {
      type: types.LOGGED_OUT,
    }
  },
}
