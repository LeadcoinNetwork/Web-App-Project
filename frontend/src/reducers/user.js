import * as types from "../actions/types"

const initialState = {
  id: 1,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default user
