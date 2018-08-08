import { push } from "connected-react-router"
import * as actions from "../actions"
import { take, put } from "redux-saga/effects"
import { delay } from "redux-saga"

if (localStorage.random_id_for_inlinemanual) {
  for (var i in localStorage) {
    if (i != "random_id_for_inlinemanual") {
      delete localStorage[i]
    }
  }
}
export default function* inlinemanualsaga() {
  while (true) {
    yield delay(1000)
    if (localStorage.shouldPushURL) {
      yield put(push(localStorage.shouldPushURL))
      delete localStorage.shouldPushURL
    }
    if (localStorage.shouldFetchAgain) {
      yield put({ type: actions.types.FETCH_USER_AGAIN })
      yield put({ type: actions.types.MY_LEADS_FETCH_LEADS })
      yield put({ type: actions.types.SELL_LEADS_FETCH_LEADS })
      yield put({ type: actions.types.BUY_LEADS_FETCH_LEADS })
      yield put({ type: actions.types.NOTIFICATIONS_FETCH_START })
      delete localStorage.shouldFetchAgain
    }
  }
}

window.triggerFetch = function() {
  localStorage.shouldFetchAgain = true
}

window.moveToSellLeads = function() {
  window.ldcPush("/sell-leads")
  window.triggerFetch()
}
window.ldcPush = function(url) {
  localStorage.shouldPushURL = url
}

window.activateStepUploading = function() {
  setTimeout(jumpToStepNotYouHaveLeadsToSell, 3000)
}
window.jumpToStepNotYouHaveLeadsToSell = function() {
  inline_manual_player.activateStep(52083, 15)
}
