import * as types from "../actions/types"

const payment = (state = [], action) => {
  switch (action.type) {
    case types.GET_PAYMENTS:
      return action.payload
    default:
      return state
  }
}

export default payment
