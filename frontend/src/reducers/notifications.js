import types from "../actions/types"

const initialState = {
  list: [],
  unreadCount: 0,
  isOpen: false,
  error: "",
}

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS_SHOW:
      return {
        ...state,
        isOpen: true,
      }
    case types.NOTIFICATIONS_HIDE:
      return {
        ...state,
        isOpen: false,
      }
    case types.NOTIFICATIONS_CLICK:
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case types.NOTIFICATIONS_UPDATE:
      return {
        ...state,
        list: action.payload.list.concat(state.list),
        unreadCount: action.payload.unreadCount,
        error: "",
      }
    case types.NOTIFICATIONS_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case types.USER_MENU_OPEN:
      return {
        ...state,
        isOpen: false,
      }
    case types.USER_MENU_CLICK:
    case types.LANGUAGE_SELECTOR_CLICK:
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state
  }
}

export default notifications
