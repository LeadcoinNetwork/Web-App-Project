import { take } from "redux-saga/effects"

export default function* saga2() {
  while (true) {
    var t = yield take()
  }
}
