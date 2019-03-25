//ts-check
import * as actions from "../actions"
import { metamask } from "../utils/metamask-service"
import { select, put, take, call } from "redux-saga/effects"
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
    const ans = yield api.users.getMe()

    if (ans.user) {
      yield put(actions.user.loggedIn(ans.user)) // Update the state
      if (lastUserId != ans.user.id) {
        lastUserId = ans.user.id
        window.inlineManualTracking = {
          // uid: parseInt(Math.random() * 10000),
          uid:
            process.env.FRONTEND +
            "-" +
            ans.user.id +
            (localStorage.random_id_for_inlinemanual
              ? "-" + Math.random()
              : ""),
          email: ans.user.email,
          name: ans.user.fname + " " + ans.user.lname,
          created: new Date().valueOf() / 1000,
        }
        startPlayerWaitUntilItsLoaded()
      }
      if (!metamask.initialized) {
        const init = yield metamask.init()
        const verify = yield metamask.verify()
        const balance = yield metamask.getBalance(ans.user.wallet)
        yield put(actions.balance.balanceUpdate(balance))
      } else {
        const balance = yield metamask.getBalance(ans.user.wallet)
        yield put(actions.balance.balanceUpdate(balance))
      }
    }
    yield put(actions.route.redirectIfNeeded())
    yield take(actions.types.FETCH_USER_AGAIN)
  }
}
var lastUserId
const balance = 0

function startPlayerWaitUntilItsLoaded() {
  if (localStorage.skip_inline_manual) return
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
