import types from "../actions/types"

const storage = window.localStorage

const flagLanguageConverter = {
  us: "en",
  cn: "zh",
  jp: "ja",
  kr: "ko",
  il: "he"
}

const initialState = {
  current: storage.getItem("current") || "en",
}

const leads = (state = initialState, action) => {
  switch (action.type) {
    case types.LANGUAGE_SELECTOR_UPDATE:
      const current = flagLanguageConverter[action.payload]
      storage.setItem("current", current)
      return {
        ...state,
        current: current,
      }
    default:
      return state
  }
}
export default leads
