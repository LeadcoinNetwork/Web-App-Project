import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
let last_search
export default function* buyLeads(api) {
  while (true) {
    let { page, limit, sortBy, filter } = yield select(state => state.buyLeads)
    console.log(filter.search)
    if (filter.search) {
      if (last_search != filter.search) {
        last_search = filter.search
        yield put(actions.leads.clearLeads("BUY_LEADS"))
      }
    }
    let res = yield api.leads.buyLeadsGetList({
      page,
      limit,
      sortBy,
      filter,
    })

    if (res.error) {
      yield put(actions.leads.fetchError("BUY_LEADS"))
    } else {
      yield put(actions.leads.fetchSuccess("BUY_LEADS", res))
    }

    yield take([
      types.BUY_LEADS_FETCH_LEADS,
      types.CHECKOUT_BUY_SUCCESS,
      types.LOGIN_FINISH,
      types.LOGGED_OUT,
    ])
  }
}
