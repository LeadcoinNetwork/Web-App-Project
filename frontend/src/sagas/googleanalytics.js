import { types } from "../actions"
import { take } from "redux-saga/effects"

export default function* googleAnalyticsSasga() {
  while (true) {
    var lastpage = ""
    var { payload } = yield take("@@router/LOCATION_CHANGE")
    var pathname = payload.location.pathname
    if (lastpage == pathname) continue
    lastpage = pathname
    try {
      window.gtag("config", "UA-110168671-5", {
        page_path: pathname,
      })
    } catch (err) {}
  }
}
