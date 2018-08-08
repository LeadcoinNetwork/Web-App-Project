import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* login(api) {
  while (true) {
    yield take(types.LOGIN_SUBMIT)
    yield put(actions.login.loginLoading())

    let { email, password } = yield select(state => state.login)
    let ans = yield api.users.login({
      email,
      password,
    })
    yield put(actions.login.loginFinish())
    window.triggerFetch()
    if (ans.error) {
      yield put(actions.login.loginError(ans.error))
    } else {
      yield put(actions.user.loggedIn(ans.user))
      yield put(actions.route.gotoDefaultHome())
    }
  }
}
