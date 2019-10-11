import types from "./types"

export default {
  historyLeadStart() {
    return {
      type: types.HISTORY_LEAD_START,
    }
  },
  historyLeadSuccess(params) {
    return {
      type: types.HISTORY_LEAD_SUCCESS,
      payload: params,
    }
  },
  historyLeadError(params) {
    return {
      type: types.HISTORY_LEAD_ERROR,
      payload: params,
    }
  },
}
