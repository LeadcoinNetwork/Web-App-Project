import { types } from "Actions"
import { take, call } from "redux-saga/effects"
import { toast } from "react-toastify"

export default function* snackbar() {
  while (true) {
    let notification = yield take(types.NOTIFICATION_SHOW)
    yield call(toast[notification.payload.type], notification.payload.message)
  }
}
