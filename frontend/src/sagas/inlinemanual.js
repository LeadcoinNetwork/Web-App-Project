import { push } from "connected-react-router"
import * as actions from "../actions"
import { take, put } from "redux-saga/effects"
import { delay } from "redux-saga"
export default function* inlinemanualsaga() {
  while (true) {
    yield delay(1000)
    if (localStorage.shouldPushURL) {
      yield put(push(localStorage.shouldPushURL))
      delete localStorage.shouldPushURL
    }
    if (localStorage.shouldFetchAgain) {
      yield put({ type: actions.types.MY_LEADS_FETCH_LEADS })
      delete localStorage.shouldFetchAgain
    }
  }
}

window.moveToSellLeads = function() {
  window.ldcPush("/sell-leads")
  localStorage.shouldFetchAgain = true
}
window.ldcPush = function(url) {
  localStorage.shouldPushURL = url
}
