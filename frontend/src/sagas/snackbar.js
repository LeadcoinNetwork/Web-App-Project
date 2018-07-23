import { types } from "../actions"
import { take } from "redux-saga/effects"
import { toast } from "react-toastify"

export default function* snackbar(api) {
  while (true) {
    let notifiction = yield take(types.NOTIFICATION_SHOW)

    toast(String(notifiction.payload.message), {
      type: notifiction.payload.type,
    })
  }
}
