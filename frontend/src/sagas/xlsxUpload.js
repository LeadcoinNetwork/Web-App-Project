import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* xlsxUpload(api) {
  while (true) {
    yield take(types.XLSX_PARSE_PICK_FILE)
    yield put(actions.xlsxUpload.xlsxUploadLoadingStart())

    let { file } = yield select(state => state.xlsxUpload)
    let fd = new FormData()
    fd.append("leads", file)
    let ans = yield api.leads.sellLeadsXlsxParsing(fd)
    yield put(actions.xlsxUpload.xlsxUploadLoadingDone())
    window.triggerFetch()
    if (ans.error) {
      yield put(actions.xlsxUpload.xlsxUploadError("Error", ans.error))
    } else {
      yield put(push("/sell-leads"))
    }
  }
}
