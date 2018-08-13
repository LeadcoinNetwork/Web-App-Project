import { push } from "connected-react-router"
import * as actions from "../actions"
import { take, put } from "redux-saga/effects"
import { delay } from "redux-saga"
import * as $ from "jquery"

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
      yield put({ type: actions.types.CLEAR_ALL_LEADS })
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
  console.log("fetch triggered")
  localStorage.shouldFetchAgain = true
}

window.ldcPush = function(url) {
  localStorage.shouldPushURL = url
}

var activateStepUploadingOnlyOnce = false
window.activateStepUploading = function() {
  if (activateStepUploadingOnlyOnce) return true
  activateStepUploadingOnlyOnce = true
  apiClient.leads.addMockLeads()
  setTimeout(function() {
    clickNext()
    ldcPush("/sell-leads")
  }, 3000)
}
function clickNext() {
  console.log("clickNext")
  $(".inmplayer-popover-button-next")[0].click()
}

window.jumpToStepNotYouHaveLeadsToSell = function() {
  inline_manual_player.activateStep(52083, 16)
}

window.moveToHome = function() {
  window.ldcPush("/home")
}

window.moveToBuyLeads = function() {
  window.ldcPush("/buy-leads")
}

window.moveToShoppingCart = function() {
  window.ldcPush("/shopping-cart")
}

window.moveToMyLeads = function() {
  window.ldcPush("/my-leads")
}

window.moveToSellLeads = function() {
  window.ldcPush("/sell-leads")
}

window.moveToSellAndFetch = function() {
  console.log("moveToSellAndFetch")
  // window.moveToSellLeads()
  window.triggerFetch()
}

window.machingAlgorithmStart = function() {
  setTimeout(function() {
    window.apiClient.leads.buyMeOut()
  }, 2000)
  setTimeout(function() {
    clickNext()
  }, 5000)
}
