import { types } from "../actions"
import * as Actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"

export default function* loadLeadForEdit(api) {
  while (true) {
    const action = yield take(types.EDIT_LEAD_LOAD_LEAD)
    const { id } = action
    yield put(Actions.editLead.editLeadLoadingStart())
    let res = yield api.leads.loadLeadForEdit(id)
    yield put(Actions.editLead.editLeadLoadingEnd())
    if (res.error) {
      yield put(actions.route.gotoDefaultHome())
    } else {
      yield put(Actions.editLead.editLead(res))
    }
  }
}
