import types from "./types"

export default {
  withdrawPageFormUpdate(name, value) {
    return {
      type: types.WITHDRAW_PAGE_FORM_UPDATE,
      payload: {
        name,
        value,
      }
    }
  },
  withdrawPageSubmit() {
    return {
      type: types.WITHDRAW_PAGE_SUBMIT,
    }
  },
  withdrawPageLoadingStart() {
    return {
      type: types.WITHDRAW_PAGE_LOADING_START,
    }
  },
  withdrawPageLoadingFinish() {
    return {
      type: types.WITHDRAW_PAGE_LOADING_FINISH,
    }
  },
  withdrawPageError(error) {
    return {
      type: types.WITHDRAW_PAGE_ERROR,
      payload: error,
    }
  },
}