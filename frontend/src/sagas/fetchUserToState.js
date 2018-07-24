import * as Actions from "../actions"
import { select, put, take } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"
/**
 * This SAGA fetch the user from the server and updates the state
 * This saga start immediatly and do not waits for (TAKE)
 * You can called it again by dispatach FETCH_USER_AGAIN
 * @param api {API} - this is this paramters
 */
export default function* fetchUserToState(api) {
  while (true) {
    var ans = yield api.users.getMe()
    if (ans.user) {
      yield put(Actions.user.loggedIn(ans.user)) // Update the state
    }
    yield put(Actions.route.redirectIfNeeded())
    yield take(Actions.types.FETCH_USER_AGAIN)
  }
}
