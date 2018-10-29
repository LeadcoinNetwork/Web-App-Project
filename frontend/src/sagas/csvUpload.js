import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { routerMiddleware, push } from "react-router-redux"
import { delay } from "redux-saga"

import API from "../api/index"

export default function* csvUpload(api) {
  while (true) {
    yield take(types.CSV_UPLOAD_SUBMIT)
    const {
      fields_map,
      agree_to_terms,
      price: lead_price,
      industry,
    } = yield select(state => state.csvMapping)
    const { file } = yield select(state => state.csvUpload)
    yield put(actions.csvUpload.csvUploadLoadingStart())
    const res = yield api.leads.sellLeadsCsvMapping({
      fields_map,
      agree_to_terms,
      lead_price,
      file,
      industry,
    })
    yield put(actions.csvUpload.csvUploadLoadingDone())
    if (res.error) {
      const errors = res.error
      for (let error in errors) {
        yield put(actions.csvUpload.csvUploadError(error, errors[error]))
      }
    } else {
      yield put(actions.csvUpload.csvUploadSuccess())
      yield delay(7500)
      window.triggerFetch()
      yield delay(3000)
      yield put(actions.csvUpload.csvUploadReset())
      yield put(push("/sell-leads"))
    }
  }
}
