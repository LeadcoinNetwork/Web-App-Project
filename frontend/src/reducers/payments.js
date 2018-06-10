import * as types from "../actions/types"

const initialState = {
  fetechedAll: false,
  loading: true,
  lastRefresh: null,
  list: [],
}

const payment = (state = initialState, action) => {
  switch (action.type) {
    case types.PAYMENTS_HISTORY_UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    case types.PAYMENTS_HISTORY_START:
      return {
        ...state,
        loading: true,
      }
    case types.PAYMENTS_HISTORY_FINISH:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default payment
