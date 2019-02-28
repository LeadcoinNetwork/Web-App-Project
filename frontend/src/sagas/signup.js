import { types } from "Actions"
import * as Actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { routerMiddleware, push } from "react-router-redux"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* signup(api) {
  while (true) {
    yield take(types.SIGNUP_SUBMIT)
    yield put(Actions.signup.signupLoading())
    var { fname, lname, wallet, email, password } = yield select(
      state => state.signup,
    )
    var ans = yield api.users.signUp({
      fname,
      lname,
      email,
      wallet,
      password,
    })
    window.triggerFetch()
    if (ans.error) {
      yield put(Actions.signup.signupError(ans.error))
    } else {
      yield put(Actions.signup.signupFinish())
      yield put(Actions.user.loggedIn(ans.user))
      yield put(push("/email-confirmation"))
    }
  }
}
