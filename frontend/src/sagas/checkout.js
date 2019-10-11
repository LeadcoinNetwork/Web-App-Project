import React from "react"
import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, all, call } from "redux-saga/effects"
import { push } from "react-router-redux"
import { toast } from "react-toastify"
import API from "../api/index"
import { metamask } from "../utils/metamask-service"

/**
 * @param api {API} - this is this paramters
 */

export default function* checkout(api) {
  while (true) {
    yield take(types.CHECKOUT_BUY_START)
    let { selected, list } = yield select(state => state.buyLeads)
    let user = yield select(state => state.user)
    let selectedLeads = list.filter(lead => selected.has(lead.id))
    let checkUserWallet = yield metamask.isAddress(user.wallet)
    toast("Wallet is verified", {
      type: "success",
      closeOnClick: true,
    })
    const transfer = yield all(
      selectedLeads.map(lead => call(leadTransfer, api, lead, user)),
    )

    yield put(actions.checkout.checkoutBuySuccess())
    yield put(actions.leads.setSelectedLeads("BUY_LEADS", new Set()))
    window.triggerFetch()
    yield put(push("/my-leads"))
  }
}

const leadTransfer = function*(api, lead, user) {
  try {
    let transfer = yield metamask.transfer(lead.ownerWallet, lead.lead_price)
    yield put(
      actions.notifications.notificationsCreate({
        msg: "Pending transaction",
        txHash: transfer,
      }),
    )
    toast(
      <div
        ref={e => {
          if (e) {
            e = e.parentElement // toast body
            e = e.parentElement // toast class
            e = e.parentElement // toast container
            e.style.width = "625px"
          }
        }}
      >
        Tanscation has been send, TxHash {transfer}
      </div>,
      {
        type: "success",
        closeOnClick: true,
      },
    )

    let receipt = yield metamask.checkTxHash(transfer)
    const balance = yield metamask.getBalance(user.wallet)
    yield put(actions.balance.balanceUpdate(balance))
    // , valueParam, fromParam, toParam, dateParam
    let res = yield api.leads.buyLeadsBuy(
      [lead.id],
      transfer,
      lead.lead_price,
      receipt.from,
      lead.ownerWallet,
      new Date().getTime(),
    )

    yield put(
      actions.notifications.notificationsCreate({
        msg: "Confirmed transaction",
        txHash: transfer,
      }),
    )

    toast(
      <div
        ref={e => {
          if (e) {
            e = e.parentElement // toast body
            e = e.parentElement // toast class
            e = e.parentElement // toast container
            e.style.width = "625px"
          }
        }}
      >
        <div> Your order has been completed.</div>
        <div>
          {" "}
          Your TX has been broadcast to the network. Check your TX below:{" "}
        </div>
        <div> {transfer} </div>
        <a target="_blank" href={`https://etherscan.io/tx/${transfer}`}>
          {" "}
          View It Here{" "}
        </a>
      </div>,
      {
        type: "success",
        autoClose: false,
        closeOnClick: false,
        // pauseOnHover: true,
      },
    )
  } catch (err) {
    toast(err.message, {
      type: "error",
      closeOnClick: true,
    })
    yield put(actions.checkout.checkoutBuyError(err.message))
  }
}
