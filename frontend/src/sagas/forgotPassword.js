import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"

export default function* forgotPassword(api) {
  while (true) {
    yield take(actions.types.FORGOT_PASSWORD_SUBMIT)

    yield put(actions.forgotPassword.forgotPassswordLoading())
    let email = yield select(state => state.forgotPassword.email)
    let ans = yield api.users.forgotPassword(email)

    yield put(actions.forgotPassword.forgotPassswordFinish())

    if (ans.error) {
      yield put(actions.app.notificationShow(ans.error, "error"))
    } else {
      yield put(
        actions.app.notificationShow(
          "We have emailed your password reset link.",
          "success",
        ),
      )
    }
  }
}
