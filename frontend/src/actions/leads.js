import types from "./types"

export default {
  setSearch(namespace, params) {
    return {
      type: types[namespace + "_SET_SEARCH"],
      payload: params,
    }
  },
  fetchLeads(namespace, params) {
    return {
      type: types[namespace + "_FETCH_LEADS"],
      payload: params,
    }
  },
  fetchSuccess(namespace, payload) {
    return {
      type: types[namespace + "_FETCH_SUCCESS"],
      payload,
    }
  },
  fetchError(namespace, error) {
    return {
      type: types[namespace + "_FETCH_ERROR"],
    }
  },
  setSelectedLeads(namespace, selected) {
    return {
      type: types[namespace + "_SET_SELECTED_LEADS"],
      payload: selected,
    }
  },
}
