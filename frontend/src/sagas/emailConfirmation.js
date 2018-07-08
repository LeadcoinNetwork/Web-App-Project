import types from "../actions/types"
import * as actions from "../actions"
import { take, put } from "redux-saga/effects"

export default function* emailConfirmation(api) {
  while (true) {
    yield take(types.EMAIL_CONFIRMATION_RESEND)

    let ans = yield api.users.resendEmail()

    if (ans.error) {
      yield put(actions.app.notificationShow(ans.error, "error"))
    } else {
      yield put(
        actions.app.notificationShow(
          "We sent a verification email. Please follow the instructions in it.",
          "success",
        ),
      )
    }
  }
}
