import types from "./types"

export default {
  reviewsUserStart() {
    return {
      type: types.REVIEWS_USER_START,
    }
  },
  reviewsUserSuccess(data) {
    return {
      type: types.REVIEWS_USER_SUCCESS,
      payload: data,
    }
  },
  reviewsUserError(params) {
    return {
      type: types.REVIEWS_USER_ERROR,
      payload: params,
    }
  },
}
