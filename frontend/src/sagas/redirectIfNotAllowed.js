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

import * as Actions from "Actions"
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
    log("redirect if need before take")
    yield take([Actions.types.REDIRECT_IF_NEEDED, "@@router/LOCATION_CHANGE"])
    // yield take(Actions.types.REDIRECT_IF_NEEDED)
    log("redirect if need after take")
    var user = yield select(state => state.user)
    log("redirect if need user:", user)
    var path = yield select(state => state.router.location.pathname)

    if (!user) {
      // user is not logged in.
      log("not user")
      if (!allowedAnon(path)) {
        log("not user is not allowed")
        yield put(Actions.route.gotoDefaultHome())
      }
    } else {
      // user is logged in
      if (user.disabled) {
        log("user disabled")
        // user is disabled. Go to default page
        if (!allowedDisabled(path)) {
          log("disabled user is not allowed page")
          yield put(Actions.route.gotoDefaultHome())
        }
      } else {
        /** the current path */
        let path = yield select(state => state.router.location.pathname)

        log("user is enabled")
        if (!allowedLogedIn(path)) {
          log("not allowed")
          yield put(Actions.route.gotoDefaultHome())
        }
      }
    }
  }
}
