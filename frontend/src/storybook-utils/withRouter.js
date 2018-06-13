import React from "react"
import { createStore, applyMiddleware } from "redux"
import { storyReduxLogger } from "./withRedux"
import { composeWithDevTools } from "redux-devtools-extension"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import rootReducer from "Reducers"
import Root from "containers/Root"
import createSagaMiddleware from "redux-saga"
import RootSaga from "sagas"

export function createStoreAndStory({
  path,
  component,
  sagaFunction,
  connectToProductionSaga,
}) {
  var middlewares = [storyReduxLogger]
  if (sagaFunction || connectToProductionSaga) {
    var sagaMiddleware = createSagaMiddleware()
    middlewares.unshift(sagaMiddleware)
  }
  /**
   * Redux Store
   * @type {{dispatch:()=>void}}
   */
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  )
  if (connectToProductionSaga) {
    sagaMiddleware.run(RootSaga)
  }
  if (sagaFunction) {
    sagaMiddleware.run(sagaFunction)
  }
  const UpperCaseComponent = component
  return {
    store,
    sagaMiddleware,
    story: (
      <Provider store={store}>
        <div>
          {path && (
            <MemoryRouter initialEntries={[path]} initialIndex={0}>
              <Root />
            </MemoryRouter>
          )}
          {component && <UpperCaseComponent />}
        </div>
      </Provider>
    ),
  }
}
