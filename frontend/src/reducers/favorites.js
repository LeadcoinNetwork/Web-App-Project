import types from "../actions/types"

const initialState = {
  loading: false,
  error: {},
}

const favorites = (state = initialState, action) => {
  switch (action.type) {
    case types.FAVORITES_ADD_START:
      return {
        ...state,
        loading: true,
      }
    case types.FAVORITES_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case types.FAVORITES_ADD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case types.FAVORITES_REMOVE_START:
      return {
        ...state,
        loading: true,
      }
    case types.FAVORITES_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case types.FAVORITES_REMOVE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default favorites
