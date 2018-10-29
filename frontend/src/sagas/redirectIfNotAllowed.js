/**
 * Some manual tests
 * 
 * /signup
☑ not logged in => go to login
☑ logged in => go to buy-leads
☑ logged in disabled => go to disbled page

/buy-leads
not logged in => go to login
logged in => stay
logged in disabled => go to disbled page

/sell-leads
not logged in => go to login
logged in => stay
logged in disabled => go to disbled page

/forgot-password

Redirect & Back

/buy-leads 
logedin click on link in user menu.

/terms
/privacy
*/

import * as actions from "../actions"
import { select, put, take } from "redux-saga/effects"

function everyone(path) {
  if (["/privacy", "/terms"].includes(path)) return true
}
function allowedDisabled(path) {
  if (everyone(path)) return true
  return [
    "/email-confirmation",
    "/complete-registration",
    "/forgot-password",
  ].includes(path)
}
function allowedAnon(path) {
  if (everyone(path)) return true
  return ["/login", "/signup", "/forgot-password"].includes(path)
}
function allowedLogedIn(path) {
  if (everyone(path)) return true
  if (path == "/") return false
  if (allowedDisabled(path)) return false
  return !allowedAnon(path)
}

window.SHOW_REDIRECT_LOGS = false
function log() {
  if (window.SHOW_REDIRECT_LOGS) {
    console.log.apply(console, arguments)
  }
}

import API from "../api/index"
/**
 * @param api {API} - this is this paramters
 */
export default function* redirectIfNotAllowed(api) {
  while (true) {
    yield take([actions.types.REDIRECT_IF_NEEDED, "@@router/LOCATION_CHANGE"])
    var user = yield select(state => state.user)
    var path = yield select(state => state.router.location.pathname)

    if (!user) {
      // user is not logged in.
      if (!allowedAnon(path)) {
        yield put(actions.route.gotoDefaultHome())
      }
    } else {
      // user is logged in
      if (user.disabled) {
        // user is disabled. Go to default page
        if (!allowedDisabled(path)) {
          yield put(actions.route.gotoDefaultHome())
        }
      } else {
        // the current path
        let path = yield select(state => state.router.location.pathname)

        if (!allowedLogedIn(path)) {
          yield put(actions.route.gotoDefaultHome())
        }
      }
    }
  }
}
