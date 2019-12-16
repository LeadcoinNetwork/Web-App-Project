import types from "./types"

export default {
  profileLoading() {
    return {
      type: types.PROFILE_LOADING,
    }
  },

  profileFinish() {
    return {
      type: types.PROFILE_FINISH,
    }
  },

  profileError() {
    return {
      type: types.PROFILE_ERROR,
    }
  },
}
