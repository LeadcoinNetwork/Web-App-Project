import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* addLead(api) {
  while (true) {
    const action = yield take(types.ADD_LEAD_SUBMIT_FORM)
    yield put(actions.addLead.addLeadLoadingStart())
    let { values } = yield select(state => state.addLead)
    let res = yield api.leads.sellLeadsAddByForm(values)
    yield put(actions.addLead.addLeadLoadingEnd())
    if (res.error) {
      yield put(actions.addLead.addLeadAddError("error", res.error))
    } else {
      yield put(actions.addLead.addLeadSubmitSuccess())
      yield put(actions.addLead.addLeadClearForm())
      yield put(push("/sell-leads"))
    }
  }
}
