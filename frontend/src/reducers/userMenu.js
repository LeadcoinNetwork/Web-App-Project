import { types } from "../actions"

const initialState = {
  isOpen: false,
}

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_MENU_OPEN:
      return {
        ...state,
        isOpen: true,
      }
    case types.USER_MENU_CLOSE:
      return {
        ...state,
        isOpen: false,
      }
    case types.USER_MENU_CLICK:
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case types.NOTIFICATIONS_SHOW:
      return {
        ...state,
        isOpen: false,
      }
    case types.NOTIFICATIONS_CLICK:
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state
  }
}

export default notifications
