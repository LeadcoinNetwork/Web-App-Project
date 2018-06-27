import types from "./types"

export default {
  loginHandleChange(name, value) {
    return {
      type: types.LOGIN_HANDLE_CHANGE,
      payload: { name, value },
    }
  },

  loginUserSubmit() {
    return {
      type: types.LOGIN_SUBMIT,
    }
  },

  loginLoading() {
    return {
      type: types.LOGIN_LOADING,
    }
  },

  loginError(message) {
    return {
      type: types.LOGIN_ERROR,
      payload: {
        message,
      },
    }
  },
}
