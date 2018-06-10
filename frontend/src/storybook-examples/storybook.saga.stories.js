import React from "react"
import { storiesOf } from "@storybook/react"
import { storyReduxLogger } from "../storybook-utils/withRedux"
import { createStore, applyMiddleware } from "redux"
import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects"
import createSagaMiddleware from "redux-saga"
import "babel-polyfill"

storiesOf("Example Stories/saga").add("saga", () => {
  // Create Saga Middleware
  const sagaMiddleware = createSagaMiddleware()

  // Redux create Store
  var store = createStore(
    () => {},
    [],
    applyMiddleware(sagaMiddleware, storyReduxLogger),
  )

  sagaMiddleware.run(sagaListener)

  function* sagaListener() {
    // Wait and listen to this action
    yield take("REDUX_EXAMPLE_ACTION_FROM_DISPATCH")

    // Here we can do side-effects

    // Execute this action
    yield put({ type: "REDUX_ACTION_FROM_SAGA" })
  }

  return (
    <div
      onClick={() => {
        store.dispatch({ type: "REDUX_EXAMPLE_ACTION_FROM_DISPATCH" })
      }}
    >
      Click to dispatch
    </div>
  )
})
