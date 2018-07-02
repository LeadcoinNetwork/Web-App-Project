import types from "../actions/types"
import translateDatabase from "./translate-database"

const initialState = {
  database: translateDatabase,
  current: "en",
}

const leads = (state = initialState, action) => {
  return state
}
export default leads
