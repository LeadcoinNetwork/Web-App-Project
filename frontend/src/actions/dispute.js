import types from "./types"

export default {
  disputeHandleChange(name, value) {
    return {
      type: types.DISPUTE_HANDLE_CHANGE,
      payload: { name, value },
    }
  },

  disputeUserSubmit() {
    return {
      type: types.DISPUTE_SUBMIT,
    }
  },

  disputeLoading() {
    return {
      type: types.DISPUTE_LOADING,
    }
  },

  disputeFinish() {
    return {
      type: types.DISPUTE_FINISH,
    }
  },

  disputeError(message) {
    return {
      type: types.DISPUTE_ERROR,
      payload: {
        message,
      },
    }
  },
}
