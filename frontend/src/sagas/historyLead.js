import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* historyLead(api) {
  while (true) {
    const action = yield take(types.HISTORY_LEAD_START)
    let { id } = yield select(state => state.displayLead)
    let res = yield api.leads.getHistoryLead({ leadId: id })
    if (res.error) {
      const errors = res.error
      for (let error in errors) {
        yield put(actions.historyLead.historyLeadError(error))
      }
    } else {
      console.log(res)
      yield put(actions.historyLead.historyLeadSuccess(res))
      window.triggerFetch()
    }
  }
}
