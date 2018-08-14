import React from "react"
import { createStore, applyMiddleware } from "redux"
import { storyReduxLogger } from "./withRedux"
import { composeWithDevTools } from "redux-devtools-extension"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import rootReducer from "Reducers"
import App from "containers/App"
import createSagaMiddleware from "redux-saga"
import rootSaga from "sagas"
import {
  routerMiddleware,
  connectRouter,
  ConnectedRouter,
} from "connected-react-router"
import { createBrowserHistory, createMemoryHistory } from "history"
import { user } from "Actions"
import languageSaga from "../sagas/language"

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
  } else {
    var history = createMemoryHistory({})
  }

  // if (sagaFunction || connectToProductionSaga) {
  var sagaMiddleware = createSagaMiddleware()
  // middlewares.unshift(sagaMiddleware)
  middlewares.push(sagaMiddleware)
  // }
  /**
   * Redux Store
   * @type {{dispatch:()=>void}}
   */
  const store = createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(applyMiddleware(...middlewares)),
  )
  var sagaTask
  sagaMiddleware.run(languageSaga)
  if (connectToProductionSaga) {
    sagaTask = sagaMiddleware.run(rootSaga)
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
  if (module.hot) {
    module.hot.accept("Reducers", function() {
      store.replaceReducer(connectRouter(history)(rootReducer))
    })
    if (module.hot) {
      module.hot.accept("sagas", function() {
        if (sagaTask) {
          console.log("cancel previous saga task")
          sagaTask.cancel()
          sagaTask.done.then(() => {
            console.log("replacing the saga")
            sagaTask = sagaMiddleware.run(rootSaga)
          })
        }
      })
    }
  }

  return {
    store,
    sagaMiddleware,
    story: (
      <Provider store={store}>
        <div>
          {path && (
            <ConnectedRouter
              history={history}
              action="fight for your right to party"
            >
              <App />
            </ConnectedRouter>
          )}
          {component && <UpperCaseComponent />}
        </div>
      </Provider>
    ),
  }
}
