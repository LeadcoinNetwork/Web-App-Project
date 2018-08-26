import { types } from "Actions"
import { take } from "redux-saga/effects"

export default function* googleAnalyticsSasga() {
  while (true) {
    var { payload } = yield take("@@router/LOCATION_CHANGE")
    console.log("taked!")
    var pathname = payload.location.pathname
    console.log(pathname)
    try {
      window.gtag("config", "UA-110168671-5", {
        page_path: pathname,
      })
    } catch (err) {}
  }
}
