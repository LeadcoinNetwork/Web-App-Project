import { types } from "../actions"
const storage = window.localStorage

const initialState = storage.getItem("industry")
const industry = (state = initialState, action) => {
  switch (action.type) {
    case types.INDUSTRY_UPDATE:
      storage.setItem("industry", action.payload)
      return action.payload
    default:
      return state
  }
}

export default industry
