import types from "../actions/types"
import * as actions from "../actions"
import { push } from "react-router-redux"
import { select, take, put, call } from "redux-saga/effects"

import API from "../api/index.ts"
/**
 * @param api {API} - this is this paramters
 */
export default function completeRegistration(api) {
  return function*() {
    while (true) {
      yield take(types.COMPLETE_REGISTRATION_SUBMIT)
      var profile = yield select(state => state.completeRegistration)
      var ans = yield api.users.completeProfile({
        ...profile,
        phone: profile.phone.value,
      })
      console.log(ans)
      if (ans.error) {
        yield put(
          actions.completeRegistration.completeRegistrationError(ans.error),
        )
      } else {
        yield put(actions.route.gotoDefaultHome())
      }
    }
  }
}
