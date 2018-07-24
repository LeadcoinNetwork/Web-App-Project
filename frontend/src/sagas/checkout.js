import { types } from "../actions"
import * as actions from "../actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* checkout(api) {
  while (true) {
    yield take(types.CHECKOUT_BUY_START)

    let { selected } = yield select(state => state.buyLeads)

    let res = yield api.leads.buyLeadsBuy(Array.from(selected))
    console.log(res)

    if (res.error) {
      yield put(actions.checkout.checkoutBuyError())
    } else {
      yield put(actions.checkout.checkoutBuySuccess())
      yield put(
        actions.app.notificationShow(
          "Your order has been placed successfully",
          "success",
        ),
      )
      yield put(actions.leads.setSelectedLeads("BUY_LEADS", new Set()))
      yield put(push("/my-leads"))
    }
  }
}
