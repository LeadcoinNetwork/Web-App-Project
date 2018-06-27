import types from "./types"

export default {
  notificationsTableLoadingStart() {
    return {
      type: types.NOTIFICATIONS_TABLE_LOADING_START,
    }
  },

  notificationsTableLoadingEnd() {
    return {
      type: types.NOTIFICATIONS_TABLE_LOADING_END,
    }
  },

  notificationsTableUpdate(list) {
    return {
      type: types.NOTIFICATIONS_TABLE_UPDATE,
      payload: list,
    }
  },

  notificationsTableError(message) {
    return {
      type: types.NOTIFICATIONS_TABLE_ERROR,
      payload: message,
    }
  },
}
