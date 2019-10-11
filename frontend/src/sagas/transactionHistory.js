import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* TransactionHistory(api) {
  while (true) {
    yield take(types.TRANSACTION_HISTORY_FETCH)
    let { id } = yield select(state => state.user)
    let ans = yield api.leads.transactionHistoryGet(id)
    window.triggerFetch()
    if (ans.error) {
      yield put(actions.transactionHistory.transactionHistoryError(ans.error))
    } else {
      yield put(actions.transactionHistory.transactionHistorySuccess(ans.user))
    }
  }
}
