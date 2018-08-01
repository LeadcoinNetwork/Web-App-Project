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
var url = require("url")
var basename = url.parse(process.env.FRONTEND).path
const history = createBrowserHistory({ basename })

const ROUTER_MIDDLEWARE = routerMiddleware(history)

var sagaMiddleware = createSagaMiddleware()

const store = createStore(
  createReducer(),
  composeWithDevTools(applyMiddleware(ROUTER_MIDDLEWARE, sagaMiddleware)),
)

var sagaTask
runSagas()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter
      history={history}
      baseName={process.env.FRONTEND}
      action="action required?"
    >
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)

if (module.hot) {
  module.hot.accept("./reducers/index", function() {
    console.log("reducers replaced")
    store.replaceReducer(createReducer())
  })
}
if (module.hot) {
  module.hot.accept("./sagas", function() {
    sagaTask.cancel()
    console.log("replacing the saga, because hot reload")
    runSagas()
  })
}

function createReducer() {
  return connectRouter(history)(rootReducer)
}

function runSagas() {
  sagaTask = sagaMiddleware.run(rootSaga)
  sagaTask.done.catch(() => {
    console.log("replacing the saga, because of an error")
    runSagas()
  })
}
