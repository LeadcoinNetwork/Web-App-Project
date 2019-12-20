import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"
import leads from "../actions/leads"

/**
 * @param api {API} - this is this paramters
 */
export default function* reviewSubmit(api) {
  while (true) {
    yield take(types.REVIEW_SUBMIT)

    let { id } = yield select(state => state.displayLead)
    let { text } = yield select(state => state.review)

    yield put(actions.review.reviewLoading())
    let res = yield api.users.createReview({
      comment: text,
      leadId: id,
    })
    yield put(actions.review.reviewFinish())
    if (res.error) {
      yield put(actions.review.reviewError(res.error))
      yield put(
        actions.leads.fetchLeads("SELL_LEADS", {
          list: [],
        }),
      )
    } else {
      yield put(
        actions.app.notificationShow("You successfully send review", "success"),
      )
      yield put(actions.review.reviewClear())
      yield put(actions.auctionLeads.fetchLeads())
    }
  }
}
