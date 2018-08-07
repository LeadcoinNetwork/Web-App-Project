import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* notifications(api) {
  while (true) {
    yield take(types.NOTIFICATIONS_FETCH_START)

    let res = yield api.notifications.getNotifications()
    console.log(res)

    if (res.error) {
      yield put(actions.notifications.notificationsFetchError(res.error))
    } else {
      yield put(
        actions.notifications.notificationsUpdate(res.list, res.unreadCount),
      )
    }
  }
}
