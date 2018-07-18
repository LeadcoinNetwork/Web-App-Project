import types from "../actions/types"

const initialState = {
  loading: false,
}

const checkout = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_LOADING_START:
      return {
        ...state,
        loading: true,
      }
    case types.CHECKOUT_LOADING_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.CHECKOUT_ERROR:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default checkout
