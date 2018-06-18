import * as types from "../actions/types"

const initialState = {
  list: [],
  unreadCount: 0,
  isOpen: false,
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
        list: action.payload.list,
        unreadCount: action.payload.unreadCount,
      }
    default:
      return state
  }
}

export default notifications
