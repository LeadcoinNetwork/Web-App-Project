import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { routerMiddleware, push } from "react-router-redux"
import { delay } from "redux-saga"

import API from "../api/index"

export default function* loadLeadForEdit(api) {
  while (true) {
    const action = yield take(types.EDIT_LEAD_LOAD_LEAD)
    const { id } = action
    yield put(actions.editLead.editLeadLoadingStart())
    let res = yield api.leads.loadLeadForEdit(id)
    yield put(actions.editLead.editLeadLoadingEnd())
    if (res.error) {
      yield put(actions.route.gotoDefaultHome())
    } else {
      yield put(actions.editLead.editLead(res))
    }
  }
}
