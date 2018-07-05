import types from "../actions/types"

const initialState = {
  page: 1,
  limit: 5,
  total: 0,
  list: [],
  selected: new Set(),
}

const createReducerFor = (namespace) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case types[namespace+'_GET_LEADS']:
        return {
          ...action.payload,
          selected: state.selected,
          list: [...state.list, ...action.payload.list],
        }
      case types[namespace+'_SET_SELECTED_RECORDS']:
        return {
          ...state,
          selected: action.payload,
        }
      default:
        return state
    }
  }
}

export default createReducerFor