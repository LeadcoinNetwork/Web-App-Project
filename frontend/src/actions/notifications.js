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
