import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

const disabledPages = {
  PROFILE_NOT_COMPLETED: "/complete-registration",
  EMAIL_NOT_VERIFIED: "/email-confirmation",
}

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function login(api) {
  return function*() {
    while (true) {
      yield take(types.LOGIN_SUBMIT)
      yield put(actions.login.loginLoading())

      let { email, password } = yield select(state => state.login)

      let ans = api.users.login({
        email,
        password,
      })

      if (ans.error) {
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
  }
}
