import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* addToAuction(api) {
  while (true) {
    yield take(types.MY_LEADS_ADD_TO_AUCTION_START)

    let { selected } = yield select(state => state.myLeads)
    let addToAuctionData = yield select(state => state.addToAuction)
    console.log(selected, addToAuctionData)
    let request = {
      leadId: Array.from(selected)[0],
      endDate: addToAuctionData.endDate,
    }
    let res = yield api.leads.addToAuction(request)

    if (res.error) {
      yield put(actions.addToAuction.addToAuctionError())
    } else {
      yield put(actions.leads.loadingStart("MY_LEADS"))
      yield put(actions.leads.clearLeads("MY_LEADS"))
      yield put(actions.leads.loadingStart("AUCTION_LEADS"))
      yield put(actions.leads.clearLeads("AUCTION_LEADS"))
      yield put(actions.leads.loadingStart("SELL_LEADS"))
      yield put(actions.leads.clearLeads("SELL_LEADS"))
      yield put(actions.addToAuction.addToAuctionSuccess())
      yield put(
        actions.app.notificationShow(
          "Lead added to auction successfully",
          "success",
        ),
      )
    }
  }
}
