import React from "react"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "../../reducers"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"
import * as types from "../../actions/types"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import Root from "./index"
import { put, take } from "redux-saga/effects"
import { delay } from "redux-saga"
import { storiesOf } from "@storybook/react"
import { storyReduxLogger } from "../../storybook-utils/withRedux"

const paymentsMock = require("../../mocks/payments.json")

function getPaymentsSaga(mockType) {
  return function*() {
    while (true) {
      yield take("GET_PAYMENTS")
      yield put({ type: types.PAYMENTS_HISTORY_START })
      yield delay(500)
      yield put({
        type: types.PAYMENTS_HISTORY_UPDATE,
        payload: {
          fetchedAll: false,
          list: paymentsMock.slice(0, mockType),
        },
      })
      yield put({
        type: types.PAYMENTS_HISTORY_FINISH,
      })
      console.log(store.getState())
    }
  }
}

const sagaMiddleware = createSagaMiddleware()

var store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, storyReduxLogger)),
)

sagaMiddleware.run(getPaymentsSaga(2))

storiesOf("App")
  .add("home", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("payments Page", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/payments"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
