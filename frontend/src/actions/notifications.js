import types from "./types"
import { SOCKET } from "./api"

export default {
  notificationsClear() {
    return {
      type: types.NOTIFICATIONS_CLEAR,
    }
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

  notificationsCreate(payload) {
    return {
      type: types.NOTIFICATIONS_CREATE,
      payload,
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
