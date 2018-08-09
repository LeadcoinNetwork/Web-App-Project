import { types } from "../actions"
import * as Actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { routerMiddleware, push } from "react-router-redux"

import API from "../api/index"

export default function* csvUpload(api) {
  while (true) {
    const action = yield take(types.CSV_UPLOAD_SUBMIT)
    let { fields_map, agree_to_terms, price: lead_price } = yield select(
      state => state.csvMapping,
    )
    let { file } = yield select(state => state.csvUpload)
    yield put(Actions.csvUpload.csvUploadLoadingStart())
    let res = yield api.leads.sellLeadsCsvMapping({
      fields_map,
      agree_to_terms,
      lead_price,
      file,
    })
    console.log(res)
    return
    yield put(Actions.addLead.csvUploadLoadingEnd())
    if (res.error) {
      const errors = res.error
      for (let error in errors) {
        yield put(Actions.addLead.csvUplaodAddError(error, errors[error]))
      }
    } else {
      yield put(Actions.addLead.csvUploadSubmitSuccess())
      window.triggerFetch()
      yield put(push("/sell-leads"))
    }
  }
}
