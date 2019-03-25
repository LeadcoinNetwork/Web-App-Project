//@ts-check
import { types } from "../actions"
import * as Actions from "../actions"
import { toast } from "react-toastify"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* logout(api) {
  while (true) {
    yield take(types.LOG_OUT)
    yield api.users.logout()
    yield toast.dismiss()
    yield put(Actions.user.loggedOut())
    yield put(Actions.login.loginClear())
    yield put(Actions.signup.signupClear())
    yield put(Actions.notifications.notificationsClear())
    yield put(push("/login"))
  }
}
