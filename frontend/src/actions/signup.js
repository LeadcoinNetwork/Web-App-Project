import types from "./types"

export default {
  signupHandleChange(name, value) {
    return {
      type: types.SIGNUP_HANDLE_CHANGE,
      payload: { name, value },
    }
  },

  signupSubmit() {
    return {
      type: types.SIGNUP_SUBMIT,
    }
  },

  signupLoading() {
    return {
      type: types.SIGNUP_LOADING,
    }
  },

  signupFinish() {
    return {
      type: types.SIGNUP_FINISH,
    }
  },

  signupError(errors) {
    return {
      type: types.SIGNUP_ERROR,
      payload: errors,
    }
  },
}
