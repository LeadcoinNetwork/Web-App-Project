import * as types from "../actions/types"

const initialState = {
  current: { message: null },
  list: [],
  unreadCount: 0,
  isOpen: false,
}

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return {
        ...state,
        current: action.payload,
      }
    case types.HIDE_NOTIFICATION:
      return {
        ...state,
      }
    case types.SHOW_NOTIFICATIONS:
      return {
        ...state,
        isOpen: true,
      }
    case types.HIDE_NOTIFICATIONS:
      return {
        ...state,
        isOpen: false,
      }
    case types.UPDATE_NOTIFICATIONS:
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
