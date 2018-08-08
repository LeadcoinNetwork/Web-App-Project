import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* addLead(api) {
  while (true) {
    const action = yield take(types.ADD_LEAD_SUBMIT_FORM)
    let { values, agree_to_terms } = yield select(state => state.addLead)
    yield put(actions.addLead.addLeadLoadingStart())
    let res = yield api.leads.sellLeadsAddByForm({
      ...values,
      agree_to_terms,
    })
    yield put(actions.addLead.addLeadLoadingEnd())
    if (res.error) {
      const errors = res.error
      for (let error in errors) {
        yield put(actions.addLead.addLeadAddError(error, errors[error]))
      }
    } else {
      yield put(actions.addLead.addLeadSubmitSuccess())
      yield put(actions.addLead.addLeadClearForm())
      window.triggerFetch()
      yield put(push("/sell-leads"))
    }
  }
}
