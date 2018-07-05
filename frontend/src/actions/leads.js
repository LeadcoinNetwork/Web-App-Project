import types from "./types"

export default {
  getLeads(payload) {
    return {
      type: types.BUY_LEADS_GET_LEADS,
      payload,
    }
  },
  addError(error) {
    return {
      type: types.BUY_LEADS_ERROR,
      error,
    }
  },
  fetchLeads(options) {
    return {
      type: types.BUY_LEADS_FETCH_LEADS,
      options,
    }
  },
}