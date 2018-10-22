import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { routerMiddleware, push } from "react-router-redux"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* csvMapping(api) {
  while (true) {
    const data = yield take(types.CSV_MAPPING_SUBMIT)
    //yield put(actions.csvMapping.csvMappingSubmit(data))
    /*
    var { fname, lname, email, password } = yield select(state => state.signup)
    var response = yield call(request, "POST", "/user", {
      password,
    })
    if (ans.isError) {
      yield put(actions.signup.SIGNUP_FORM_ERROR(ans.data.error))
    } else {
      yield put(push("/email-confirmation"))
    }
    */
  }
}
