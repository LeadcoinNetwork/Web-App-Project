import types from "./types"

export default {
  forgotPassswordHandleChange(name, value) {
    return {
      type: types.FORGOT_PASSWORD_HANDLE_CHANGE,
      payload: { name, value },
    }
  },

  forgotPassswordUserSubmit() {
    return {
      type: types.FORGOT_PASSWORD_SUBMIT,
    }
  },

  forgotPassswordLoading() {
    return {
      type: types.FORGOT_PASSWORD_LOADING,
    }
  },

  forgotPassswordFinish() {
    return {
      type: types.FORGOT_PASSWORD_FINISH,
    }
  },
}
