import { types } from "Actions"
import * as Actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import request from "Utils/request"

export default function* logout() {
  while (true) {
    yield take(types.LOGGED_OUT)
    yield call(request, "POST", "/auth/logout")
  }
}
