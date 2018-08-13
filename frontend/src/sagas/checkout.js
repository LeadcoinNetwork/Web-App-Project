import React from "react"
import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"
import { toast } from "react-toastify"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* checkout(api) {
  while (true) {
    yield take(types.CHECKOUT_BUY_START)

    let { selected } = yield select(state => state.buyLeads)

    let res = yield api.leads.buyLeadsBuy(Array.from(selected))

    if (res.error) {
      yield put(actions.checkout.checkoutBuyError(res.error))
    } else {
      yield put(actions.checkout.checkoutBuySuccess())
      toast(
        <div>
          <div> Order placed successfully</div>
          <a target="_blank" href={res.response.link}>
            View It Here{" "}
          </a>
        </div>,
        {
          type: "success",
        },
      )
      yield put(actions.leads.setSelectedLeads("BUY_LEADS", new Set()))
      window.triggerFetch()
      yield put(push("/my-leads"))
    }
  }
}
