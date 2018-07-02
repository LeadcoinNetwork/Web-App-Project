import React from "react"
import { storiesOf } from "@storybook/react"
import { storyReduxLogger } from "../storybook-utils/withRedux"
import { createStore, applyMiddleware } from "redux"

storiesOf("Example Stories/Redux", module).add("Redux", () => {
  var store = createStore(() => {}, [], applyMiddleware(storyReduxLogger))
  return (
    <div
      onClick={() => {
        store.dispatch({ type: "ABCD" })
      }}
    >
      Click here to dispatch
    </div>
  )
})
