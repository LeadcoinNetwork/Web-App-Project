import types from "../actions/types"

const industry = (state = "", action) => {
  switch (action.type) {
    case types.INDUSTRY_UPDATE:
      return action.payload
    default:
      return state
  }
}

export default industry
