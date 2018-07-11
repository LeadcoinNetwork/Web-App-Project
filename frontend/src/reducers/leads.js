import types from "../actions/types"

const initialState = {
  page: 1,
  limit: 5,
  total: 0,
  list: [],
  selected: new Set(),
  error: "",
  loading: false,
}

const createReducerFor = namespace => {
  return (state = initialState, action) => {
    switch (action.type) {
      case types[namespace + "_FETCH_LEADS"]:
        return {
          ...state,
          loading: true,
          error: false,
        }
      case types[namespace + "_FETCH_SUCCESS"]:
        return {
          ...state,
          ...action.payload,
          loading: false,
          error: false,
          list: [...state.list, ...action.payload.list],
        }
      case types[namespace + "_FETCH_ERROR"]:
        return {
          ...state,
          loading: false,
        }
      case types[namespace + "_SET_SELECTED_LEADS"]:
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
