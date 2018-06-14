import * as types from "./types"

export function notificationsTableLoadingStart() {
  return {
    type: types.NOTIFICATIONS_TABLE_LOADING_START,
  }
}

export function notificationsTableLoadingEnd() {
  return {
    type: types.NOTIFICATIONS_TABLE_LOADING_END,
  }
}

export function notificationsTableUpdate(list) {
  return {
    type: types.NOTIFICATIONS_TABLE_UPDATE,
    payload: list,
  }
}

export function notificationsTableError(message) {
  return {
    type: types.NOTIFICATIONS_TABLE_ERROR,
    payload: message,
  }
}
