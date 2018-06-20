import { types } from "Actions"
import * as Actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import request from "Utils/request"
import { routerMiddleware, push } from "react-router-redux"

export default function* csvMapping() {
  while (true) {
    alert('1')
    const data = yield take(types.CSV_MAPPING_SUBMIT)
    alert('2')
    //yield put(Actions.csvMapping.csvMappingSubmit(data))
    /*
    var { fname, lname, email, password } = yield select(state => state.signup)
    var response = yield call(request, "POST", "/user", {
      password,
    })
    if (ans.isError) {
      yield put(Actions.signup.SIGNUP_FORM_ERROR(ans.data.error))
    } else {
      yield put(push("/email-confirmation"))
    }
    */
  }
}
