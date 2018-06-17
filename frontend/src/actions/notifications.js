import * as types from "./types"
import { SOCKET } from "./api"

export const connectToNotifications = dispatch => {
  SOCKET.on("notification", notification => {
    dispatch({
      type: types.NOTIFICATION_SHOW,
      payload: notification,
    })
  })
}

export function notificationsShow() {
  return {
    type: types.NOTIFICATIONS_SHOW,
  }
}

export function notificationsHide() {
  return {
    type: types.NOTIFICATIONS_HIDE,
  }
}

export function notificationsClick() {
  return {
    type: types.NOTIFICATIONS_CLICK,
  }
}

export function notificationsUpdate(list, unreadCount) {
  return {
    type: types.NOTIFICATIONS_UPDATE,
    payload: { list, unreadCount },
  }
}

export function notificationsViewAll() {
  return {
    type: types.NOTIFICATIONS_VIEW_ALL,
  }
}
