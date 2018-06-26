import types from "../actions/types"

const initialState = {
  id: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGGED_IN:
      return {
        ...state,
        ...action.payload,
      }
    case types.LOGGED_OUT:
      return {
        id: null,
      }
    default:
      return state
  }
}

export default user
