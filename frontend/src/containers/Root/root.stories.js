import React from "react"
import { storiesOf } from "@storybook/react"
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

import { createStore, applyMiddleware, combineReducers } from "redux"
import Root from "./index"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"

import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects"
import { delay } from "redux-saga"

import { PaymentReducer } from "../../reducers/payments"

// MOCKS
// const leadsMock = require("../mocks/leads.json")
const paymentsMock = require("../../mocks/payments.json")

import RootReducer from "../../reducers"

import * as types from "../../actions/types"

import "babel-polyfill"

import { storyReduxLogger } from "../../storybook-utils/withRedux"

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

storiesOf("Dev-Containers")
  .add("payments Page", () => {
    const sagaMiddleware = createSagaMiddleware()
    var store = createStore(
      RootReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware, storyReduxLogger)),
    )
    sagaMiddleware.run(getPaymentsSaga(2))

    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/payments"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("payments Page 100 items", () => {
    const sagaMiddleware = createSagaMiddleware()
    var store = createStore(
      RootReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware, storyReduxLogger)),
    )
    sagaMiddleware.run(getPaymentsSaga(50))

    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/payments"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
