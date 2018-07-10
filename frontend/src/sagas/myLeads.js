import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index.ts"

/**
 * @param api {API} - this is this paramters
 */
export default function myLeads(api) {
  return function*() {
    while (true) {
      const action = yield take(types.MY_LEADS_FETCH_LEADS)
      let res = yield api.leads.getMyLeads(action.options)
      if (res.error) {
        yield put(actions.leads.addError(res.error))
      } else {
        yield put(actions.leads.getLeads(res.response))
      }
    }
  }
}
