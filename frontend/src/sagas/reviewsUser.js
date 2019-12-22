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
    let { mode } = yield select(state => state.reviewsUser)
    let id = ""
    if (mode === "my") {
      let user = yield select(state => state.user)
      id = user.id
    } else if (mode === "lead") {
      let { ownerId } = yield select(state => state.displayLead)
      id = ownerId
    }
    let res = yield api.users.getReviews(id)
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
      yield put(actions.reviewsUser.reviewsUserSuccess(res))
    }
  }
}
