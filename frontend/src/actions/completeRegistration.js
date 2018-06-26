import types from "./types"

export default {
  completeRegistrationHandleChange(name, value) {
    return {
      type: types.COMPLETE_REGISTRATION_HANDLE_CHANGE,
      payload: { name, value },
    }
  },

  completeRegistrationSubmit() {
    return {
      type: types.COMPLETE_REGISTRATION_SUBMIT,
    }
  },

  completeRegistrationLoading() {
    return {
      type: types.COMPLETE_REGISTRATION_LOADING,
    }
  },

  completeRegistrationFinish() {
    return {
      type: types.COMPLETE_REGISTRATION_FINISH,
    }
  },

  completeRegistrationError(message) {
    return {
      type: types.COMPLETE_REGISTRATION_ERROR,
      payload: {
        message,
      },
    }
  },
}
