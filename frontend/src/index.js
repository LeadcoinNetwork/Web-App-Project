import typeScriptExample from "./example"

import "Styles/global.scss"

import React from "react"
import ReactDOM from "react-dom"
import App from "Containers/App"
import { Provider } from "react-redux"
import {
  routerMiddleware,
  ConnectedRouter,
  connectRouter,
} from "connected-react-router"
import { createBrowserHistory } from "history"
import { composeWithDevTools } from "redux-devtools-extension"
import { compose, createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers/index"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas"
const history = createBrowserHistory()

const ROUTER_MIDDLEWARE = routerMiddleware(history)

var sagaMiddleWare = createSagaMiddleware()

const store = createStore(
  createReducer(),
  composeWithDevTools(applyMiddleware(ROUTER_MIDDLEWARE, sagaMiddleWare)),
)
sagaMiddleWare.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} action="action required?">
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)

import t from "./test"

t()
if (module.hot) {
  module.hot.accept("./test", function() {
    t()
  })
}
if (module.hot) {
  module.hot.accept("./reducers/index", function() {
    console.log("reducers replaced")
    store.replaceReducer(createReducer())
  })
}

function createReducer() {
  return connectRouter(history)(rootReducer)
}
