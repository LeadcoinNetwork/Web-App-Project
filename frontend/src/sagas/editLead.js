import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"
import { preparedLeadData } from "../utils/prepare-data"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* editLead(api) {
  while (true) {
    const action = yield take(types.EDIT_LEAD_SUBMIT_FORM)
    let { original_copy, values, agree_to_terms } = yield select(
      state => state.editLead,
    )
    const prepData = preparedLeadData(values)
    const lead = Object.assign(original_copy, prepData, {
      agree_to_terms,
    })
    console.log({ lead })
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
