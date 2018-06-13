import React from "react"
import { createStore, applyMiddleware } from "redux"
import { storyReduxLogger } from "./withRedux"
import { composeWithDevTools } from "redux-devtools-extension"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import rootReducer from "Reducers"
import Root from "containers/Root"

export function createStoreAndStory({ path, component }) {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(storyReduxLogger)),
  )
  const UpperCaseComponent = component
  return {
    store,
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
