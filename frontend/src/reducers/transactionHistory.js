import { types } from "../actions"

const initialState = {
  data: null,
  error: {},
  loading: false,
}

const transactionHistory = (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSACTION_HISTORY_FETCH:
      return {
        ...state,
        loading: true,
      }
    case types.TRANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case types.TRANSACTION_HISTORY_ERROR:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default transactionHistory
