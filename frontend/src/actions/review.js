import types from "./types"

export default {
  reviewHandleChange(data) {
    return {
      type: types.REVIEW_HANDLE_CHANGE,
      payload: data,
    }
  },

  reviewSubmit(data) {
    return {
      type: types.REVIEW_SUBMIT,
      payload: data,
    }
  },

  reviewLoading(data) {
    return {
      type: types.REVIEW_LOADING,
      payload: data,
    }
  },

  reviewClear(data) {
    return {
      type: types.REVIEW_CLEAR,
    }
  },

  reviewError(data) {
    return {
      type: types.REVIEW_ERROR,
      payload: data,
    }
  },

  reviewFinish(data) {
    return {
      type: types.REVIEW_FINISH,
      payload: data,
    }
  },
}
