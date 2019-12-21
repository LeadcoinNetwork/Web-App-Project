import React from "react"
import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, all, call } from "redux-saga/effects"
import { toast } from "react-toastify"
import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */

export default function* auctionBet(api) {
  while (true) {
    yield take(types.AUCTION_BET_START)
    let { bet } = yield select(state => state.auctionBet)
    let { selected, list } = yield select(state => state.auctionLeads)
    let selectedLeads = list.filter(lead => selected.has(lead.id))
    let auctionId = selectedLeads[0].auctionData.id
    var req = yield api.leads.betAuction(auctionId, {
      price: +bet,
    })
    window.triggerFetch()
    if (!req.error) {
      toast("Bet completed successfully", {
        type: "success",
        closeOnClick: true,
      })
      yield put(actions.auctionBet.auctionBetSuccess())
    } else {
      toast("Bet process has error", {
        type: "error",
        closeOnClick: true,
      })
      yield put(actions.auctionBet.auctionBetError(req.error))
    }
  }
}
