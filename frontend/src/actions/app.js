import * as types from "./types"

export const notificationShow = (message, type) => ({
  type: types.NOTIFICATION_SHOW,
  payload: {
    message,
    type,
  },
})
