import { types } from "Actions"
import * as actions from "Actions"
import { select, take, put, call } from "redux-saga/effects"

import API from "../api/index"

/**
 * @param api {API} - this is this paramters
 */
export default function* reviewsUser(api) {
  while (true) {
    const action = yield take(types.REVIEWS_USER_START)
    let { ownerId } = yield select(state => state.displayLead)
    let res = yield api.users.getReviews(ownerId)
    if (res.error) {
      const errors = res.error
      if (typeof errors === "object") {
        for (let error in errors) {
          yield put(actions.reviewsUser.reviewsUserError(error))
        }
      }
      if (typeof errors === "string") {
        yield put(actions.reviewsUser.reviewsUserError(errors))
      }
    } else {
      console.log(res)
      yield put(actions.reviewsUser.reviewsUserSuccess(res))
    }
  }
}
