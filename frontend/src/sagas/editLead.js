import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* editLead(api) {
  while (true) {
    const action = yield take(types.EDIT_LEAD_SUBMIT_FORM)
    let { values, agree_to_terms } = yield select(state => state.editLead)
    console.log({ values })
    /*
    yield put(actions.editLead.editLeadLoadingStart())
    let res = yield api.leads.editLeadsEditByForm({
      ...values,
      agree_to_terms,
    })
    yield put(actions.editLead.editLeadLoadingEnd())
    if (res.error) {
      const errors = res.error
      for (let error in errors) {
        yield put(actions.editLead.editLeadAddError(error, errors[error]))
      }
    } else {
      yield put(actions.editLead.editLeadSubmitSuccess())
      yield put(actions.editLead.editLeadClearForm())
      window.triggerFetch()
      yield put(push("/sell-leads"))
    }
    */
  }
}
