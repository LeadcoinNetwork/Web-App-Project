//@ts-check
import { types } from "Actions"
import * as Actions from "Actions"
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
    yield put(Actions.user.loggedOut())
    yield put(push("/login"))
  }
}
