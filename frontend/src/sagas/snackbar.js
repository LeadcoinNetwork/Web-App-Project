import { types } from "Actions"
import { take, call } from "redux-saga/effects"
import { toast } from "react-toastify"

export default function snackbar() {
  return function*() {
    while (true) {
      let notifiction = yield take(types.NOTIFICATION_SHOW)

      yield call(
        toast[notification.payload.type] || toast,
        notifiction.payload.message,
      )
    }
  }
}
