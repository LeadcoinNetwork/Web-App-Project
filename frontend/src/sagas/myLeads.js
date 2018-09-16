import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"
import { types } from "../actions"
import * as actions from "../actions"

import API from "../api/index.ts"

/**
 * @param api {API} - this is this paramters
 */
export default function* myLeads(api) {
  while (true) {
    let { page, limit, sortBy, filter, mock } = yield select(
      state => state.myLeads,
    )

    let res = yield api.leads.getMyLeads({
      page,
      limit,
      sortBy,
      filter,
    })

    if (res.error) {
      yield put(actions.leads.fetchError("MY_LEADS"))
    } else {
      yield put(actions.leads.fetchSuccess("MY_LEADS", res))
    }

    yield take([
      types.MY_LEADS_FETCH_LEADS,
      types.CHECKOUT_BUY_SUCCESS,
      types.MY_LEADS_MOVE_TO_SELL_SUCCESS,
      types.LOGIN_FINISH,
      types.LOGGED_OUT,
    ])
  }
}
