import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"

import API from "../api/index"
import { toast } from "react-toastify"
import { metamask } from "../utils/metamask-service"
/**
 * @param api {API} - this is this paramters
 */
export default function* editWallet(api) {
  while (true) {
    yield take(types.EDIT_WALLET)

    const userSettings = yield select(state => state.userSettings)

    try {
      const verifyWallet = yield metamask.isAddress(userSettings.newWallet)

      const res = yield api.users.editWallet({
        address: userSettings.newWallet,
      })
      window.triggerFetch()

      if (res.success) {
        yield put(
          actions.notifications.notificationsCreate({
            msg: "You change your wallet",
          }),
        )
        toast("Wallet has been changed successfully", {
          type: "success",
          closeOnClick: true,
        })
      } else {
        toast(res.message, {
          type: "error",
          closeOnClick: true,
        })
      }
    } catch (err) {
      toast("Wallet is not valid", {
        type: "error",
        closeOnClick: true,
      })
    }
  }
}
