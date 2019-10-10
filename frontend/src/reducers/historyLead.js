import types from "../actions/types"

const initialState = {
  loading: false,
  history: null,
  error: null,
}
const historyLead = (state = initialState, action) => {
  switch (action.type) {
    case types.HISTORY_LEAD_START:
      return {
        ...state,
        loading: true,
      }
    case types.HISTORY_LEAD_SUCCESS:
      return {
        ...state,
        history: action.payload,
        loading: false,
        error: null,
      }
    case types.HISTORY_LEAD_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default historyLead
