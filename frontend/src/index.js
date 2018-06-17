import "Styles/global.scss"

import React from "react"
import ReactDOM from "react-dom"
import Root from "Containers/Root"
import { Provider } from "react-redux"
import { routerMiddleware, ConnectedRouter } from "react-router-redux"
import { createBrowserHistory } from "history"
import { compose, createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers/index"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas"

const history = createBrowserHistory()
const ROUTER_MIDDLEWARE = routerMiddleware(history)

var sagaMiddleWare = createSagaMiddleware()
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleWare, ROUTER_MIDDLEWARE),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)
sagaMiddleWare.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)
