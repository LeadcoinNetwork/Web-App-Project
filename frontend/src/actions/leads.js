import types from "./types"

export default {
  clearAllLeads() {
    return {
      type: types["CLEAR_ALL_LEADS"],
    }
  },
  clearLeads(namespace) {
    return {
      type: types[namespace + "_CLEAR_LEADS"],
    }
  },
  clearList(namespace) {
    return {
      type: types[namespace + "_CLEAR_LIST"],
    }
  },
  filterChange(namespace, newFilter) {
    return {
      type: types[namespace + "_FILTER_CHANGE"],
      payload: newFilter,
    }
  },
  searchClicked(namespace) {
    return {
      type: types[namespace + "_SEARCH_CLICKED"],
    }
  },
  loadingStart(namespace) {
    return {
      type: types[namespace + "_LOADING_START"],
    }
  },
  loadingEnd(namespace) {
    return {
      type: types[namespace + "_LOADING_END"],
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
