import { types } from "Actions"
import * as Actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import request from "Utils/request"
import { push } from "react-router-redux"

export default function* logout() {
  while (true) {
    yield take(types.LOGGED_OUT)
    yield call(request, "POST", "/auth/logout")
    yield put(push("/"))
  }
}
