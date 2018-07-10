import types from "./types"

export default {
  getLeads(namespace, payload) {
    return {
      type: types[namespace + "_GET_LEADS"],
      payload,
    }
  },
  addError(namespace, error) {
    return {
      type: types[namespace + "_ERROR"],
      payload: error,
    }
  },
  fetchLeads(namespace) {
    return {
      type: types[namespace + "_FETCH_LEADS"],
    }
  },
  setSelectedRecords(namespace, selected) {
    return {
      type: types[namespace + "_SET_SELECTED_RECORDS"],
      payload: selected,
    }
  },
}