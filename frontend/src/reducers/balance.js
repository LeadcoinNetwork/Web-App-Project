import * as Types from "../actions/types"
var initialState = {
  loading: false,
  total: 0,
  inEscrow: 0,
}
export default function(state = initialState, action) {
  switch (action) {
    case Types.ACTION_WITHDRAW_ELEMENT_START_LOADING:
      return {
        loading: true,
        ...state,
      }
      break
    case Types.ACTION_WITHDRAW_ELEMENT_FINISH_LOADING:
      return {
        loading: false,
        ...state,
      }
      break

    default:
      return state
      break
  }
}
