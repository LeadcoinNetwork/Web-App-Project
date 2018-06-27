import types from "./types"

export default {
  notificationShow(message, type) {
    return {
      type: types.NOTIFICATION_SHOW,
      payload: {
        message,
        type,
      },
    }
  },
}
