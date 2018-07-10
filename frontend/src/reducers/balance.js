import types from "../actions/types"
var initialState = {
  loading: false,
  total: 0,
  inEscrow: 0,
}
export default function(state = initialState, action) {
  switch (action.type) {
    case types.BALANCE_UPDATE:
      return {
        ...state,
        loading: false,
        total: action.payload.total,
        inEscrow: action.payload.inEscrow,
      }
    case types.BALANCE_WIDGET_LOADING_START:
      return {
        ...state,
        loading: true,
      }
    case types.BALANCE_WIDGET_LOADING_FINISH:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
