import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"
import { metamask as metamaskService } from "../utils/metamask-service"
import { toast } from "react-toastify"
/**
 * @param api {API} - this is this paramters
 */

export default function* metamask(api) {
  while (true) {
    const action = yield take(types.METAMASK_INIT)
    let isActive = false

    try {
      const init = yield metamaskService.init()
      const verify = yield metamaskService.verify()
      isActive = verify.success
    } catch (err) {
      toast(
        "Metamask is not supported by this browser. Please follow your browser’s support for MetaMask (such as Chrome)",
        {
          type: "error",
          closeOnClick: true,
          autoClose: false,
        },
      )
    } finally {
      yield put(actions.metamask.updateMetamaskStatus(isActive))
    }
  }
}
