import * as Actions from "Actions"
import { select, put, call } from "redux-saga/effects"
import { push } from "react-router-redux"

import API from "../api/index.ts"
/**
 * @param api {API} - this is this paramters
 */
export default function LoginOnBoot(api) {
  return function*() {
    while (true) {
      let ans = yield api.users.getMe()
      if (ans.error) {
        // user is not logged in.
        yield put(Actions.route.gotoDefaultHome())
        return
      } else {
        // user is logged in
        yield put(Actions.user.loggedIn(ans.user)) // Update the state
      }

      if (ans.user.disabled) {
        // user is disabled. Go to default page
        yield put(Actions.route.gotoDefaultHome())
      } else {
        /** the current path */
        let path = yield select(state => state.routerReducer.location.pathname)
        if (
          !path ||
          path === "/" ||
          path === "/login" ||
          path === "/signup" ||
          path === "/email-confirmation" ||
          path === "/complete-registration"
        ) {
          // If the user in a page that should be only to non
          // users, redirect to default page
          // yield put(push("/buy-leads"))
          yield put(Actions.route.gotoDefaultHome())
        } else {
          // If the user is any other page.
          // keep the user in the page he is current on.
        }
      }
      yield take(Actions.route.bootAgain)
    }
  }
}
