import * as types from "../actions/types"

const initialState = {
  id: null,
  payments: [],
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER:
      return {
        ...state,
        ...action.payload,
      }
    case types.GET_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
      }
    default:
      return state
  }
}

export default user
