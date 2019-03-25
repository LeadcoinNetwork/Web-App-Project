import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* notificationsCreate(api) {
  while (true) {
    yield take(types.NOTIFICATIONS_CREATE)
    let newNotification = yield select(
      state => state.notifications.newNotification,
    )

    let res = yield api.notifications.createNotification(newNotification)

    if (res.error) {
      yield put(actions.notifications.notificationsFetchError(res.error))
    } else {
      yield put(
        actions.notifications.notificationsUpdate(res.list, res.unreadCount),
      )
    }
  }
}
