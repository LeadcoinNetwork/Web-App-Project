import { types } from "Actions"
import * as Actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import request from "Utils/request"

export default function* signup() {
  while (true) {
    yield take(types.SIGNUP_SUBMIT)
    yield put(Actions.signup.SIGNUP_LOADING())
    var { fname, lname, email, password } = yield select(state => state.signup)
    var ans = yield call(request, "POST", "/user", {
      fname,
      lname,
      email,
      password,
    })
    if (ans.isError) {
      yield put(Actions.signup.SIGNUP_FORM_ERROR(ans.data.error))
    }
    // else {
    // 	yield put(Actions.signup.complete())
    // }
  }
}
