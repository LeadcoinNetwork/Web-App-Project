import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* changePassword(api) {
  while (true) {
    yield take(types.USER_SETTINGS_SUBMIT)

    let userSettings = yield select(state => state.userSettings)
    if (userSettings.newPassword === userSettings.confirmPassword) {
      yield put(actions.userSettings.userSettingsLoading())
      let res = yield api.users.setNewPassword({
        currentPassword: userSettings.currentPassword,
        newPassword: userSettings.newPassword,
      })
      yield put(actions.userSettings.userSettingsFinish())
      console.log(res)

      if (res.error) {
        yield put(actions.userSettings.userSettingsError(res.error))
      } else {
        yield put(
          actions.app.notificationShow(
            "Your password has been changed successfully",
            "success",
          ),
        )
        yield put(actions.userSettings.userSettingsClear())
      }
    } else {
      yield put(
        actions.userSettings.userSettingsError("Passwords do not match"),
      )
    }
  }
}
