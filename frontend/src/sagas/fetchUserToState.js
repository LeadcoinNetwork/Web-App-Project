//ts-check
import * as actions from "../actions"
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
      yield put(actions.user.loggedIn(ans.user)) // Update the state
      window.inlineManualTracking = {
        // uid: parseInt(Math.random() * 10000),
        uid: ans.user.id,
        email: ans.user.email,
        name: ans.user.fname + " " + ans.user.lname,
        created: new Date().valueOf() / 1000,
      }
      startPlayerWaitUntilItsLoaded()

      // update the balance
      yield put(actions.balance.balanceUpdate(ans.user.balance))
    }

    yield put(actions.route.redirectIfNeeded())
    yield take(actions.types.FETCH_USER_AGAIN)
  }
}

function startPlayerWaitUntilItsLoaded() {
  // This stange method comes from here:
  // https://help.inlinemanual.com/docs/single-page-app-and-people-tracking-angular-react-ember
  var retries = 0
  var timer = setInterval(function() {
    if (typeof createInlineManualPlayer !== "undefined") {
      createInlineManualPlayer(window.inlineManualPlayerData)
      clearInterval(timer)
    } else if (retries > 100) {
      clearInterval(timer)
    }
    retries++
  }, 50)
}
