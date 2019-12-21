import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"
import { types } from "../actions"
import * as actions from "../actions"
import { prepareLeadDataForDisplayAuction } from "../utils/prepare-data"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* auctionLeads(api) {
  while (true) {
    let { page, limit, sortBy, filter, sortOrder } = yield select(
      state => state.auctionLeads,
    )

    let res = yield api.leads.auctionLeadsGetList({
      //fixme rewrite to use auction
      page,
      limit,
      sortBy,
      filter,
      sortOrder,
    })

    if (res.error) {
      yield put(actions.leads.fetchError("AUCTION_LEADS"))
    } else {
      yield put(
        actions.leads.fetchSuccess(
          "AUCTION_LEADS",
          prepareLeadDataForDisplayAuction(res),
        ),
      )
    }

    yield take([
      types.AUCTION_LEADS_FETCH_LEADS,
      types.MY_LEADS_ADD_TO_AUCTION_SUCCESS,
      types.AUCTION_BET_SUCCESS,
      types.LOGIN_FINISH,
      types.LOGGED_OUT,
    ])
  }
}
