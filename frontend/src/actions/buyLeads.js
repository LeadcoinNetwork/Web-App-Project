import types from "./types"

export default {
  fetchLeads(namespace) {
    return {
      type: types[namespace + "_FETCH_LEADS"],
    }
  },
  fetchSuccess(namespace, payload) {
    return {
      type: types[namespace + "_FETCH_SUCCESS"],
      payload,
    }
  },
  buyLeadsUpdateList(list) {
    return {
      type: types.BUY_LEADS_UPDATE_LIST,
      payload: {
        list,
      },
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
