import types from "./types"

export default {
  gotoDefaultHome() {
    return {
      type: types.GOTO_DEFAULT_HOME,
    }
  },
  redirectIfNeeded() {
    return {
      type: types.REDIRECT_IF_NEEDED,
    }
  },

  bootAgain() {
    return { type: types.FETCH_USER_AGAIN }
  },
}
