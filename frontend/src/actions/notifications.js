import * as types from "./types"
import { SOCKET } from "./api"

export const connectToNotifications = dispatch => {
  SOCKET.on("notification", notification => {
    dispatch({
      type: types.SHOW_NOTIFICATION,
      payload: notification,
    })
  })
}

export function showNotifications() {
  return {
    type: types.SHOW_NOTIFICATIONS,
  }
}

export function hideNotifications() {
  return {
    type: types.HIDE_NOTIFICATIONS,
  }
}

export function updateNotifications(list, unreadCount) {
  return {
    type: types.UPDATE_NOTIFICATIONS,
    payload: { list, unreadCount },
  }
}
