import { take } from "redux-saga/effects"

export default function* saga2() {
  console.log("saga 2 started")
  while (true) {
    var t = yield take()
    console.log("saga2 after take:", t)
  }
}
