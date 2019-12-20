import types from "./types"

export default {
  reviewsLeadStart() {
    return {
      type: types.REVIEWS_LEAD_START,
    }
  },
  reviewsLeadSuccess(params) {
    return {
      type: types.REVIEWS_LEAD_SUCCESS,
      payload: params,
    }
  },
  reviewsLeadError(params) {
    return {
      type: types.REVIEWS_LEAD_ERROR,
      payload: params,
    }
  },
}
