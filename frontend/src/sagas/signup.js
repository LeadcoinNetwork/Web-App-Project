import { types } from "Actions"
import * as Actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import request from "Utils/request"

export default function* signup() {
  while (true) {
    yield take(types.SIGNUP_SUBMIT)
    yield put(Actions.signup.SIGNUP_LOADING())
    var { fname, lname, email, password } = yield select(state => state.signup)
    console.log(0)
    var ans = yield call(request, "POST", "/user", {
      fname,
      lname,
      email,
      password,
    })
    console.log(1)
    console.log(ans)
  }
}
