import React from "react"
import { storiesOf } from "@storybook/react"
import { storyReduxLogger } from "../storybook-utils/withRedux"
import { createStore, applyMiddleware } from "redux"
import {
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects"
import createSagaMiddleware from "redux-saga"

storiesOf("Example Stories/saga", module).add("saga", () => {
  // Create Saga Middleware
  const sagaMiddleware = createSagaMiddleware()

  // Redux create Store
  var store = createStore(
    (type, action) => {
      console.log("get action in reducer:", action)
      if (action.type == "REDUX_EXAMPLE_ACTION_FROM_DISPATCH") {
        return { i: action.i }
      }
    },
    [],
    applyMiddleware(sagaMiddleware, storyReduxLogger),
  )

  sagaMiddleware.run(sagaListener)

  function* sagaListener() {
    // Wait and listen to this action
    console.log("Saga Listener Before Take")
    yield take("REDUX_EXAMPLE_ACTION_FROM_DISPATCH")
    console.log("BEFORE YIELD new State", JSON.stringify(x), x)
    var x = yield select()
    console.log("AFTER YIELD new State", JSON.stringify(x), x)

    // Here we can do side-effects

    // Execute this action
    yield put({ type: "REDUX_ACTION_FROM_SAGA" })
  }

  return (
    <div
      onClick={() => {
        alert("click dispatch")
        store.dispatch({ type: "REDUX_EXAMPLE_ACTION_FROM_DISPATCH", i: 50 })
      }}
    >
      Click to dispatch!
    </div>
  )
})
