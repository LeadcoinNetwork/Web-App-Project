import React from "react"
import { createStore, applyMiddleware } from "redux"
import { storyReduxLogger } from "./withRedux"
import { composeWithDevTools } from "redux-devtools-extension"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import rootReducer from "Reducers"
import App from "containers/App"
import createSagaMiddleware from "redux-saga"
import RootSaga from "sagas"
import {
  routerMiddleware,
  ConnectedRouter,
  connectRouter,
} from "connected-react-router"
import { createBrowserHistory, createMemoryHistory } from "history"
import { user } from "Actions"

// const history = createBrowserHistory()

export function createStoreAndStory({
  path,
  component,
  sagaFunction,
  connectToProductionSaga,
  loggedIn,
}) {
  var ROUTER_MIDDLEWARE
  var middlewares = [storyReduxLogger]

  if (path) {
    var history = createMemoryHistory({
      initialEntries: [path],
      initialIndex: 0,
    })
    ROUTER_MIDDLEWARE = routerMiddleware(history)
    middlewares.push(ROUTER_MIDDLEWARE)
  }

  if (sagaFunction || connectToProductionSaga) {
    var sagaMiddleware = createSagaMiddleware()
    // middlewares.unshift(sagaMiddleware)
    middlewares.push(sagaMiddleware)
  }
  /**
   * Redux Store
   * @type {{dispatch:()=>void}}
   */
  const store = createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(applyMiddleware(...middlewares)),
  )
  if (connectToProductionSaga) {
    sagaMiddleware.run(RootSaga)
  }
  if (sagaFunction) {
    sagaMiddleware.run(sagaFunction)
  }
  const UpperCaseComponent = component

  if (loggedIn) {
    store.dispatch(
      user.loggedIn({ id: 1, email: "verylongusername@leadcoin.network" }),
    )
  }
  return {
    store,
    sagaMiddleware,
    story: (
      <Provider store={store}>
        <div>
          {path && (
            <ConnectedRouter history={history} action="fight for your right to party">
              <App />
            </ConnectedRouter>
          )}
          {component && <UpperCaseComponent />}
        </div>
      </Provider>
    ),
  }
}
