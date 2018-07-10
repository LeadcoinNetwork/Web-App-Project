import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index.ts"

/**
 * @param api {API} - this is this paramters
 */
export default function* boughtLeads(api) {
  while (true) {
    const action = yield take(types.BUY_LEADS_FETCH_LEADS)
    let res = yield api.leads.getBoughtLeads(action.options)
    if (res.error) {
      yield put(actions.leads.addError(res.error))
    } else {
      console.log(res)
      yield put(actions.leads.getLeads("BUY_LEADS", res.response))
    }
  }
}
