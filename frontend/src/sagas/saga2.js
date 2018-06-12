import { take } from "redux-saga/effects"

export default function* saga2() {
  if (window) {
    console.log("saga 2 started")
  }
  while (true) {
    var t = yield take()
    if (window) {
      console.log("saga2 after take:", t)
    }
  }
}
