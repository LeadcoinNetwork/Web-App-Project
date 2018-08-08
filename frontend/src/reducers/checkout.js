import types from "../actions/types"

const initialState = {
  loading: false,
  error: "",
}

const checkout = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_BUY_START:
      return {
        ...state,
        loading: true,
      }
    case types.CHECKOUT_BUY_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case types.CHECKOUT_BUY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case types["BUY_LEADS_SET_SELECTED_LEADS"]:
      return {
        ...state,
        error: "",
      }
    default:
      return state
  }
}

export default checkout
