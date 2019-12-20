import types from "./types"

export default {
  reviewsUserStart() {
    return {
      type: types.REVIEWS_USER_START,
    }
  },
  reviewsUserSuccess(params) {
    return {
      type: types.REVIEWS_USER_SUCCESS,
      payload: params,
    }
  },
  reviewsUserError(params) {
    return {
      type: types.REVIEWS_USER_ERROR,
      payload: params,
    }
  },
}
