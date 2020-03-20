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
    yield take(types.XLSX_EXPORT_IDS)
    // yield put(actions.xlsxUpload.xlsxUploadLoadingStart())

    let { leadIds } = yield select(state => state.xlsxExport)
    let ans = yield api.leads.exportXlsx(leadIds)
    // yield put(actions.xlsxUpload.xlsxUploadLoadingDone())
    window.triggerFetch()
    if (ans.error) {
      yield put(actions.xlsxUploadError("Error", ans.error))
    } else {
      let path = "/excel/export?"
      leadIds.forEach((id, index) => {
        if (index < leadIds.length - 1) {
          path += `leadId=${id}&`
        } else {
          path += `leadId=${id}`
        }
      })

      let fakeLink = document.createElement("a")
      /// Add image data as href
      fakeLink.setAttribute("href", process.env.BACKEND + path)
      console.log(process.env.BACKEND + path)
      /// Add download attribute
      fakeLink.setAttribute("download")
      /// Simulate click
      fakeLink.click()
    }
  }
}
