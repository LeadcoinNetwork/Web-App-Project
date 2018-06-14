import * as types from "../actions/types"

const initialState = {
  current: { message: null },
  list: [],
  unreadCount: 0,
  isOpen: false,
}

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFICATION_SHOW:
      return {
        ...state,
        current: action.payload,
      }
    case types.NOTIFICATION_HIDE:
      return {
        ...state,
      }
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
        list: action.payload.list,
        unreadCount: action.payload.unreadCount,
      }
    default:
      return state
  }
}

export default notifications
