import types from "./types"
import { SOCKET } from "./api"

export default {
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
  notificationsFetchError(error) {
    return {
      type: types.NOTIFICATIONS_FETCH_ERROR,
      payload: error,
    }
  },
}
