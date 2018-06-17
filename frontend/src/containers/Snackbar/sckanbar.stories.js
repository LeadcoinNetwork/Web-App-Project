import React from "react"
import { storiesOf } from "@storybook/react"
import { types } from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import Snackbar from "./Snackbar"
import { toast } from "react-toastify"

storiesOf("Containers/Snackbar")
  .add("empty", () => {
    var { store, story } = createStoreAndStory({
      component: Snackbar,
    })
    return story
  })
  .add("1 Message", () => {
    var { store, story } = createStoreAndStory({
      component: Snackbar,
    })
    store.dispatch({
      type: types.NOTIFICATION_SHOW,
      payload: { message: "Hello World" },
    })
    setTimeout(() => toast.success("Test t"), 2000)

    setTimeout(() => {
      window.toast = toast
      toast("test")
    }, 2000)
    return story
  })

  .add("2 Message", () => {
    var { store, story } = createStoreAndStory({
      component: Snackbar,
    })
    store.dispatch({
      type: types.NOTIFICATION_SHOW,
      payload: { message: "Hello World1" },
    })
    setTimeout(function() {
      store.dispatch({
        type: types.NOTIFICATION_SHOW,
        payload: { message: "Hello World2" },
      })
    }, 500)
    return story
  })
  .add("10 Message", () => {
    var { store, story } = createStoreAndStory({
      component: Snackbar,
    })
    for (var i = 0; i < 10; i++) {
      setTimeout(function() {
        store.dispatch({
          type: types.NOTIFICATION_SHOW,
          payload: { message: "Hello World:" + Math.random() },
        })
      }, 1000 * i)
    }
    return story
  })
