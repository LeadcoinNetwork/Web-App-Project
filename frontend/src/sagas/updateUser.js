import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* updateUser(api) {
  while (true) {
    yield take(types.USER_PROFILE_SETTINGS_SUBMIT)

    let userProfileSettings = yield select(state => state.userProfileSettings)
    // for future can write some code for validation
    if (true) {
      yield put(actions.userProfileSettings.userProfileSettingsLoading())
      console.log(userProfileSettings)
      let res = yield api.users.userUpdate({
        fname: userProfileSettings.fname,
        lname: userProfileSettings.lname,
        country: userProfileSettings.country,
        company: userProfileSettings.company,
        phone: userProfileSettings.phone,
      })
      yield put(actions.userProfileSettings.userProfileSettingsFinish())
      if (res.error) {
        yield put(
          actions.userProfileSettings.userProfileSettingsError(res.error),
        )
      } else {
        yield put(
          actions.app.notificationShow(
            "Your user data has been changed successfully",
            "success",
          ),
        )
        yield put(actions.userProfileSettings.userProfileSettingsClear())
      }
    } else {
      yield put(
        actions.userProfileSettings.userSettingsError(
          "User data contain error",
        ),
      )
    }
  }
}
