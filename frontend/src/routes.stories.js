// External Modules
import React from "react"
import { storiesOf } from "@storybook/react"
import { createStore, applyMiddleware } from "redux"
import { MemoryRouter } from "react-router"
import { Provider } from "react-redux"

// Internal Modules
import Root from "./containers/Root"
import rootReducer from "./reducers/index"
// const ROUTER_MIDDLEWARE = routerMiddleware(history);

var y = storiesOf("Routes", module)
var routes = [
  "/admin/login",
  "/admin/leads",
  "/admin/transactions",
  "/users/signup",
  "/users/complete-registration",
  "/users/email-confirmation",
  "/users/login",
  "/users/settings",
  "/users/notifications",
  "/users/withdrawal",
  "/payments",
  "/leads/buy",
  "/leads/sell",
  "/leads/my",
  "/leads/new",
  "/leads/csv-upload",
  "/leads/csv-mapping",
  "/leads/checkout",
  "/leads/1/dispute",
]
var i = 0
routes.forEach(path => {
  const store = createStore(
    rootReducer,
    // applyMiddleware(ROUTER_MIDDLEWARE),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
  y.add(i++ + ". " + path, () => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]} initialIndex={0}>
        <Root />
      </MemoryRouter>
    </Provider>
  ))
})
