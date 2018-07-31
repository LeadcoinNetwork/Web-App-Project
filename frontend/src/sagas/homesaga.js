import types from "../actions/types"
import { push } from "react-router-redux"
import { select, take, put, call } from "redux-saga/effects"

const disabledPages = {
  PROFILE_NOT_COMPLETED: "/complete-registration",
  EMAIL_NOT_VERIFIED: "/email-confirmation",
}

/**
 * This saga goes to a default page for the user
 * It should be launched when user open a page, that he don't have access to. (For e.g. connected user open a login page from URL)
 * Or when clicking the logo icon.
 *
 */
export default function* gotoDefaultHome(api) {
  while (true) {
    var path
    yield take(types.GOTO_DEFAULT_HOME)
    var user = yield select(state => state.user)
    if (!user || !user.id) {
      // User is not connected
      path = "/login"
    } else if (user.disabled) {
      // user is disabled
      path = disabledPages[user.disabled] // redirect to disabled reason
    } else {
      // user is not disabled. (Active)
      path = "/home"
    }
    var currentPath = yield select(state => state.router.location.pathname)
    if (currentPath != path) {
      yield put(push(path))
    }
  }
}
