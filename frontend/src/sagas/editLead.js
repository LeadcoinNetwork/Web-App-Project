import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* editLead(api) {
  while (true) {
    const action = yield take(types.EDIT_LEAD_SUBMIT_FORM)
    let {
      private_fields,
      public_fields,
      original_copy,
      agree_to_terms,
    } = yield select(state => state.editLead)
    const lead = Object.assign(original_copy, private_fields, public_fields, {
      agree_to_terms,
    })
    yield put(actions.editLead.editLeadLoadingStart())
    let res = yield api.leads.editLeadsEditByForm({ lead })
    yield put(actions.editLead.editLeadLoadingEnd())
    if (res.error) {
      const errors = res.error
      for (let error in errors) {
        yield put(actions.editLead.editLeadAddError(error, errors[error]))
      }
    } else {
      yield put(actions.editLead.editLeadSubmitSuccess())
      window.triggerFetch()
      yield put(push("/my-leads"))
    }
  }
}
