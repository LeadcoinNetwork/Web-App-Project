import * as Actions from "Actions"
import { put, call } from "redux-saga/effects"
import request from "Utils/request"
import { push } from "react-router-redux"

export default function* LoginOnBoot() {
  var ans = yield call(request, "GET", "/me")
  if (ans.isError) {
    yield put(push("/"))
  } else {
    switch (ans.user.disabled) {
      case "EMAIL_NOT_VERIFIED":
        yield put(push("/email-confirmation"))
        break
      case "PROFILE_NOT_COMPLETED":
        yield put(push("/complete-registration"))
      default:
        yield put(Actions.user.loggedIn(ans.user))
    }
  }
}
