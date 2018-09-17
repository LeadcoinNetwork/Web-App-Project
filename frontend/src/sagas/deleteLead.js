import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* deleteLead(api) {
  while (true) {
    const { id } = yield take(types.DELETE_LEAD)
    let res = yield api.leads.deleteLead(id)
    window.triggerFetch()
  }
}
