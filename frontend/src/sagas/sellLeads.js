import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"
import { types } from "../actions"
import * as actions from "../actions"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* sellLeads(api) {
  while (true) {
    let { page, limit, sortBy, filter } = yield select(state => state.sellLeads)

    let res = yield api.leads.sellLeadsGetList({
      page,
      limit,
      sortBy,
      filter,
    })

    if (res.error) {
      console.log("sell saga")
      yield put(actions.leads.fetchError("SELL_LEADS"))
    } else {
      yield put(actions.leads.fetchSuccess("SELL_LEADS", res))
    }

    yield take([
      types.SELL_LEADS_FETCH_LEADS,
      types.ADD_LEAD_SUBMIT_SUCCESS,
      types.MY_LEADS_MOVE_TO_SELL_SUCCESS,
      types.INDUSTRY_UPDATE,
      types.LOGGED_OUT,
    ])
  }
}
