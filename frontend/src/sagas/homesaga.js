import types from "../actions/types"
import { push } from "react-router-redux"
import { select, take, put, call } from "redux-saga/effects"

const disabledPages = {
  PROFILE_NOT_COMPLETED: "/complete-registration",
  EMAIL_NOT_VERIFIED: "/email-confirmation",
}

export default function gotoDefaultHome() {
  return function*() {
    while (true) {
      yield take(types.GOTO_DEFAULT_HOME)
      var user = yield select(state => state.user)
      if (!user || !user.id) {
        // User is not connected
        yield put(push("/login"))
      } else if (user.disabled) {
        // user is disabled
        yield put(push(disabledPages[user.disabled])) // redirect to disabled reason
      } else {
        // user is not disabled. (Active)
        yield put(push("/buy-leads"))
      }
    }
  }
}
