import * as Actions from "Actions"
import { select, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function LoginOnBoot(api) {
  return function*() {
    while (true) {
      let ans = yield api.users.getMe()

      if (!ans.error) {
        yield put(Actions.user.loggedIn(ans.user))
      }
      yield put(Actions.route.gotoDefaultHome())
      yield take(Actions.types.BOOT_AGAIN)
    }
  }
}
