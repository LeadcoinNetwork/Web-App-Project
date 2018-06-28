import types from "./types"
import { SOCKET } from "./api"

export default {
  connectToNotifications(dispatch) {
    // SOCKET.on("notification", notification => {
    //   dispatch({
    //     type: types.NOTIFICATION_SHOW,
    //     payload: notification,
    //   })
    // })
  },

  notificationsShow() {
    return {
      type: types.NOTIFICATIONS_SHOW,
    }
  },

  notificationsHide() {
    return {
      type: types.NOTIFICATIONS_HIDE,
    }
  },

  notificationsClick() {
    return {
      type: types.NOTIFICATIONS_CLICK,
    }
  },

  notificationsUpdate(list, unreadCount) {
    return {
      type: types.NOTIFICATIONS_UPDATE,
      payload: { list, unreadCount },
    }
  },

  notificationsViewAll() {
    return {
      type: types.NOTIFICATIONS_VIEW_ALL,
    }
  },
}
