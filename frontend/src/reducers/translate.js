import types from "../actions/types"
import translateDatabase from "./translate-database"

const initialState = {
  database: translateDatabase,
  current: "en",
}

const flagLanguageConverter = {
  us: "en",
  cn: "zh",
  jp: "ja",
  kr: "ko",
}

const leads = (state = initialState, action) => {
  switch (action.type) {
    case types.LANGUAGE_SELECTOR_UPDATE:
      return {
        ...state,
        current: flagLanguageConverter[action.payload],
      }
    default:
      return state
  }
}
export default leads
