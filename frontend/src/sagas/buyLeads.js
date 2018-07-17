import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* boughtLeads(api) {
  while (true) {
    let res = yield api.leads.buyLeadsGetList()
    if (res.error) {
      yield put(actions.leads.addError(res.error))
    } else {
      console.log(res)
      yield put(actions.buyLeads.buyLeadsUpdateList(res.list))
    }
    const action = yield take([
      types.BUY_LEADS_FETCH_LEADS,
      types.LOGIN_FINISH,
      types.LOGGED_OUT,
    ])
  }
}
