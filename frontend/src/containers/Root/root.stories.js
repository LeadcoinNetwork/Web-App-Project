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
  console.log(mockType)
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
  .add("Payments", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/payments"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Leads - buy", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leads/buy"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Leads - sell", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leads/sell"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Leads - my", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leads/my"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Leads - new", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leads/new"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Leads - csv upload", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leads/csv-upload"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Leads - csv mapping", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leads/csv-mapping"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Leads - checkout", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leads/checkout"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Leads - dispute - lead 1", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leads/1/dispute"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Users - signup", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/signup"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Users - complete registration", () => {
    return (
      <Provider store={store}>
        <MemoryRouter
          initialEntries={["/users/complete-registration"]}
          initialIndex={0}
        >
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Users - email confirmation", () => {
    return (
      <Provider store={store}>
        <MemoryRouter
          initialEntries={["/users/email-confirmation"]}
          initialIndex={0}
        >
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Users - login", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/login"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Users - settings", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/settings"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Users - notification", () => {
    return (
      <Provider store={store}>
        <MemoryRouter
          initialEntries={["/users/notifications"]}
          initialIndex={0}
        >
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Users - withdrawal", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/users/withdrawal"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Admin - login", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/admin/login"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Admin - leads", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/admin/leads"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
  .add("Admin - transactions", () => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/admin/transactions"]} initialIndex={0}>
          <Root />
        </MemoryRouter>
      </Provider>
    )
  })
