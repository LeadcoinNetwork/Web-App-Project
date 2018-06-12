import { put, call } from "redux-saga/effects"
import "../styles/global.scss"

export default function* Saga3() {
  yield put({ type: "PUT_EFFECT_ACTION" })
  yield call([console, "log"], "argument to console log")
}
