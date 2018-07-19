import { types } from "Actions"
import * as actions from "Actions"
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
    console.log(res)

    if (res.error) {
      yield put(actions.moveToSell.myLeadsMoveToSellError())
    } else {
      yield put(actions.moveToSell.myLeadsMoveToSellSuccess())
      yield put(
        actions.app.notificationShow("Leads moved successfully", "success"),
      )
      yield put(actions.leads.setSelectedLeads("MY_LEADS", new Set()))
    }
  }
}
