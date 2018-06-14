import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import Snacbar from "./Snacbar"

storiesOf("Containers/Snackbar")
  .add("empty", () => {
    var { store, story } = createStoreAndStory({
      component: Snacbar,
    })
    return story
  })
  .add("1 Message", () => {
    var { store, story } = createStoreAndStory({
      component: Snacbar,
    })
    store.dispatch({
      type: actions.types.SHOW_NOTIFICATION,
      payload: { message: "Hello World" },
    })
    return story
  })

  .add("2 Message", () => {
    var { store, story } = createStoreAndStory({
      component: Snacbar,
    })
    store.dispatch({
      type: actions.types.SHOW_NOTIFICATION,
      payload: { message: "Hello World1" },
    })
    setTimeout(function() {
      store.dispatch({
        type: actions.types.SHOW_NOTIFICATION,
        payload: { message: "Hello World2" },
      })
    }, 500)
    return story
  })
  .add("10 Message", () => {
    var { store, story } = createStoreAndStory({
      component: Snacbar,
    })
    for (var i = 0; i < 10; i++) {
      setTimeout(function() {
        store.dispatch({
          type: actions.types.SHOW_NOTIFICATION,
          payload: { message: "Hello World:" + Math.random() },
        })
      }, 1000 * i)
    }
    return story
  })
