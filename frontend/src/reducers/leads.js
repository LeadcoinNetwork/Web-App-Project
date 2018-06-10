import * as types from "../actions/index"

const initialState = {
  page: 1,
  limit: 5,
  total: 0,
  list: [],
  selected: new Set()
}

const leads = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LEADS:
      return {
        ...action.payload,
        selected: state.selected,
        list: [...state.list, ...action.payload.list]
      }
    case types.SET_SELECTED_RECORDS:
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state
  }
}

export default leads
