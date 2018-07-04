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

      let user = yield select(state => state.user)
      let path = yield select(state => state.routerReducer.location.pathname)

      if (!user || !user.id) {
        if (path !== "/signup" && path !== "/forgot-password") {
          yield put(push("/login"))
        }
      } else if (user.disabled && path !== disabledPages[user.disabled]) {
        yield put(push(disabledPages[user.disabled]))
      } else if (
        path &&
        (path === "/" ||
          path === "login" ||
          path === "/signup" ||
          path === "/email-confirmation" ||
          path === "/complete-registration")
      ) {
        yield put(push("/buy-leads"))
      }
    }
  }
}
