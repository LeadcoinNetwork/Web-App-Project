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
  connectRouter(history)(rootReducer),
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
