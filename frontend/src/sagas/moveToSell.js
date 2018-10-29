import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* moveToSell(api) {
  while (true) {
    yield take(types.MY_LEADS_MOVE_TO_SELL_BEGIN)

    let { selected } = yield select(state => state.myLeads)

    let res = yield api.leads.myLeadsMoveToSell(Array.from(selected))

    if (res.error) {
      yield put(actions.moveToSell.myLeadsMoveToSellError())
    } else {
      yield put(actions.leads.loadingStart("MY_LEADS"))
      yield put(actions.leads.clearLeads("MY_LEADS"))
      yield put(actions.leads.clearLeads("SELL_LEADS"))
      yield put(actions.moveToSell.myLeadsMoveToSellSuccess())
      yield put(
        actions.app.notificationShow("Leads moved successfully", "success"),
      )
    }
  }
}
