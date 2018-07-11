import { take } from "redux-saga/effects"
import * as actions from "actions"

export default function* language(API) {
  if (localStorage.current == "he") {
    chagneLanguage("rtl")
  }
  while (true) {
    var act = yield take(actions.types.LANGUAGE_SELECTOR_UPDATE)
    console.log(act)
    if (act.payload == "il") {
      chagneLanguage("rtl")
    } else {
      chagneLanguage("ltr")
    }
  }
}

function chagneLanguage(layout) {
  const x = document.getElementsByTagName("html")[0]
  x.setAttribute("class", x.getAttribute("class").replace(/ltr|rtl/, layout))
}
