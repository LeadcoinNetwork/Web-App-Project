import types from "../actions/types"
import * as actions from "../actions"
import { push } from "react-router-redux"
import { select, take, put, call } from "redux-saga/effects"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* completeRegistration(api) {
  while (true) {
    yield take(types.COMPLETE_REGISTRATION_SUBMIT)
    var profile = yield select(state => state.completeRegistration)
    var ans = yield api.users.completeProfile({
      ...profile,
      phone: profile.phone.value,
    })
    if (ans.error) {
      yield put(
        actions.completeRegistration.completeRegistrationError(ans.error),
      )
    } else {
      console.log("here2")
      yield put(actions.route.bootAgain())
    }
  }
}
