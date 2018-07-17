import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* sellLeads(api) {
  while (true) {
    let { page, limit, sortBy, category, search } = yield select(
      state => state.sellLeads,
    )

    let res = yield api.leads.sellLeadsGetList({
      page,
      limit,
      sortBy,
      category,
    })

    if (res.error) {
      yield put(actions.leads.fetchError("SELL_LEADS"))
      yield put(actions.app.notificationShow(res.error, "error"))
    } else {
      yield put(actions.leads.fetchSuccess("SELL_LEADS", res))
    }

    yield take([
      types.SELL_LEADS_FETCH_LEADS,
      types.LOGIN_FINISH,
      types.LOGGED_OUT,
    ])
  }
}
