import types from "../actions/types"

const initialState = {
  fetechedAll: false,
  loading: true,
  lastRefresh: null,
  list: [],
  error: "",
}

const payment = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENTS_HISTORY_LOADING_START:
      return {
        ...state,
        loading: true,
      }
    case types.PAYMENTS_HISTORY_LOADING_END:
      return {
        ...state,
        loading: false,
      }
    case types.PAYMENTS_HISTORY_UPDATE:
      return {
        ...state,
        list: action.payload,
      }
    case types.PAYMENTS_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default payment
