import types from "../actions/types"

const initialState = null

const user = (state = initialState, action) => {
  // Do not use ...state since initialState is null

  switch (action.type) {
    case types.LOGGED_IN:
      return { ...action.payload }

    case types.LOGGED_OUT:
      return initialState
    default:
      return state
  }
}

export default user
