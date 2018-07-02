import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index.ts"

/**
 * @param api {API} - this is this paramters
 */
export default function addLead(api) {
  return function*() {
    while (true) {
      const action = yield take(types.ADD_LEAD_SUBMIT_FORM)
      yield put(actions.addLead.addLeadLoadingStart())
      let { values } = yield select(state => state.addLead)
      let res = yield api.leads.add(values)
      console.log({ res })
      return
      if (ans.error) {
        yield put(actions.leads.addError(ans.error))
      } else {
        yield put(actions.leads.addComplete())
      }
    }
  }
}
