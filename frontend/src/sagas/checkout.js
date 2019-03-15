import React from "react"
import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"
import { toast } from "react-toastify"
import API from "../api/index"
import { metamask } from "../utils/metamask-service"
import { totalLeadsPrice } from "../utils/prepare-data"

/**
 * @param api {API} - this is this paramters
 */

export default function* checkout(api) {
  while (true) {
    yield take(types.CHECKOUT_BUY_START)

    let { selected, list } = yield select(state => state.buyLeads)
    let user = yield select(state => state.user)
    let selectedLeads = list.filter(lead => selected.has(lead.id))
    let price = totalLeadsPrice(selectedLeads)
    let checkWallet = yield metamask.isAddress(user.wallet)
    toast("Wallet is verified", {
      type: "success",
      closeOnClick: true,
    })
    try {
      let transfer = yield metamask.transfer(user.wallet, price)
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

      let checkTxHash = yield metamask.checkTxHash(transfer)

      let res = yield api.leads.buyLeadsBuy([...selected])

      if (res.error) {
        yield put(actions.checkout.checkoutBuyError(res.error))
      } else {
        yield put(actions.checkout.checkoutBuySuccess())
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
            <a
              target="_blank"
              href={`https://ropsten.etherscan.io/tx/${transfer}`}
            >
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
        yield put(actions.leads.setSelectedLeads("BUY_LEADS", new Set()))
        window.triggerFetch()
        yield put(push("/my-leads"))
      }
    } catch (err) {
      toast(err.message, {
        type: "error",
        closeOnClick: true,
      })
      yield put(actions.checkout.checkoutBuyError(err.message))
    }
  }
}
