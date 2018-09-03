import types from "./types"

export default {
  clearLeads() {
    return {
      type: types["CLEAR_ALL_LEADS"],
    }
  },
  searchChange(namespace, new_value) {
    return {
      type: types[namespace + "_SEARCH_CHANGE"],
      payload: new_value,
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
  toggelCardView(namespace, index) {
    return {
      type: types[namespace + "_TOGGLE_CARD_VIEW"],
      payload: index,
    }
  },
}
