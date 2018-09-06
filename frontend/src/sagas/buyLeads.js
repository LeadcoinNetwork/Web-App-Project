import * as _ from "lodash"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"
import { types } from "../actions"
import * as actions from "../actions"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
let last_filter = {}
export default function* buyLeads(api) {
  while (true) {
    let { page, limit, sortBy, filter } = yield select(state => state.buyLeads)

    let res = yield api.leads.buyLeadsGetList({
      page,
      limit,
      sortBy,
      filter,
    })

    if (res.error) {
      yield put(actions.leads.fetchError("BUY_LEADS"))
    } else {
      if (!_.isEqual(filter, last_filter)) {
        last_filter = filter
        yield put(actions.leads.clearLeads("BUY_LEADS"))
      }
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
