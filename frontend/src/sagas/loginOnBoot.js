import * as Actions from "Actions"
import { select, put, call } from "redux-saga/effects"
import request from "Utils/request"
import { push } from "react-router-redux"

const disabledPages = {
  PROFILE_NOT_COMPLETED: "/complete-registration",
  EMAIL_NOT_VERIFIED: "/email-confirmation",
}

export default function* LoginOnBoot() {
  let ans = yield call(request, "GET", "/me")

  if (ans.isError) {
    yield put(push("/login"))
  } else {
    yield put(Actions.user.loggedIn(ans.user))

    if (ans.user.disabled) {
      yield put(push(disabledPages[ans.user.disabled]))
    } else {
      let { location } = yield select(state => state.routerReducer),
        path = location.pathname

      if (
        !path ||
        path === "/login" ||
        path === "/signup" ||
        path === "/email-confirmation" ||
        path === "/complete-registration"
      ) {
        yield put(push("/buy-leads"))
      }
    }
  }
}
