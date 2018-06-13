import * as types from "../actions/types"
var initialState = {
  loading: false,
  total: 0,
  inEscrow: 0,
}
export default function(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER_BALANCE:
      return {
        ...state,
        loading: false,
        total: action.payload.total,
        inEscrow: action.payload.inEscrow,
      }
    case types.ACTION_WITHDRAW_ELEMENT_START_LOADING:
      return {
        ...state,
        loading: true,
      }
      break
    case types.ACTION_WITHDRAW_ELEMENT_FINISH_LOADING:
      return {
        ...state,
        loading: false,
      }
      break

    default:
      return state
      break
  }
}
