import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { routerMiddleware, push } from "react-router-redux"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* signup(api) {
  while (true) {
    yield take(types.SIGNUP_SUBMIT)
    yield put(actions.signup.signupLoading())
    var { fname, lname, email, password } = yield select(state => state.signup)
    var ans = yield api.users.signUp({
      fname,
      lname,
      email,
      password,
    })
    window.triggerFetch()
    if (ans.error) {
      yield put(actions.signup.signupError(ans.error))
    } else {
      yield put(actions.signup.signupFinish())
      yield put(actions.user.loggedIn(ans.user))
      yield put(push("/email-confirmation"))
    }
  }
}
