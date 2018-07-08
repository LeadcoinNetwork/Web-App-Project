import { put, take } from "redux-saga/effects"
import { delay } from "redux-saga"
export default function* s(a) {
  console.log("9")
  // while (true) {
  //   yield delay(1500)
  //   console.log("after delay")
  // }
  try {
    yield take("wait for nothing")
  } finally {
    console.log("did not taked")
  }
}
