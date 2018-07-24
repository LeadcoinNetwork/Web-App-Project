import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* buyLeads(api) {
  while (true) {
    let { page, limit, sortBy, category, search } = yield select(
      state => state.buyLeads,
    )

    let res = yield api.leads.buyLeadsGetList({
      page,
      limit,
      sortBy,
      category,
      search,
    })

    if (res.error) {
      yield put(actions.leads.fetchError("BUY_LEADS"))
    } else {
      yield put(actions.leads.fetchSuccess("BUY_LEADS", res))
    }

    yield take([
      types.BUY_LEADS_FETCH_LEADS,
      types.LOGIN_FINISH,
      types.LOGGED_OUT,
    ])
  }
}
