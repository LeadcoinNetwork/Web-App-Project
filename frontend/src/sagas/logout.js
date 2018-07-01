//@ts-check
import { types } from "Actions"
import * as Actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import request from "Utils/request"
import { push } from "react-router-redux"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function logout(api) {
  return function*() {
    while (true) {
      yield take(types.LOGGED_OUT)
      yield api.users.logout()
      yield put(push("/login"))
    }
  }
}
