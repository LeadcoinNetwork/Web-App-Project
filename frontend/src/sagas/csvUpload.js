import { types } from "../actions"
import * as Actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { routerMiddleware, push } from "react-router-redux"
import { delay } from "redux-saga"
import { parseFieldsMap } from "../utils/prepare-data"
import API from "../api/index"

export default function* csvUpload(api) {
  while (true) {
    const action = yield take(types.CSV_UPLOAD_SUBMIT)
    let { fields_map, agree_to_terms, price: lead_price } = yield select(
      state => state.csvMapping,
    )
    let { file } = yield select(state => state.csvUpload)
    yield put(Actions.csvUpload.csvUploadLoadingStart())
    yield (fields_map = parseFieldsMap(fields_map))
    let res = yield api.leads.sellLeadsCsvMapping({
      fields_map,
      agree_to_terms,
      lead_price,
      file,
    })
    yield put(Actions.csvUpload.csvUploadLoadingDone())
    if (res.error) {
      const errors = res.error
      for (let error in errors) {
        yield put(Actions.csvUpload.csvUploadError(error, errors[error]))
      }
    } else {
      yield put(Actions.csvUpload.csvUploadSuccess())
      yield delay(7500)
      window.triggerFetch()
      yield delay(3000)
      yield put(Actions.csvUpload.csvUploadReset())
      yield put(push("/sell-leads"))
    }
  }
}
