import { types } from "../actions"

const languageFlagConverter = {
  en: "us",
  zh: "cn",
  ja: "jp",
  ko: "kr",
}

const initialState = {
  country: languageFlagConverter[window.localStorage.getItem("current")] || "us",
  isOpen: false,
}

const language = (state = initialState, action) => {
  switch (action.type) {
    case types.LANGUAGE_SELECTOR_UPDATE:
      return {
        ...state,
        country: action.payload,
        isOpen: false,
      }
    case types.LANGUAGE_SELECTOR_CLICK:
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case types.LANGUAGE_SELECTOR_OPEN:
      return {
        ...state,
        isOpen: true,
      }
    case types.LANGUAGE_SELECTOR_CLOSE:
      return {
        ...state,
        isOpen: false,
      }
    case types.NOTIFICATIONS_CLICK:
    case types.USER_MENU_CLICK:
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state
  }
}

export default language
