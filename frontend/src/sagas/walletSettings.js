import { types } from "Actions"
import * as Actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { routerMiddleware, push } from "react-router-redux"

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* editWallet(api) {
  while (true) {
    yield take(types.EDIT_WALLET)

    const ans = yield api.users.editWallet({
      user,
      wallet,
    })
    window.triggerFetch()
  }
}
