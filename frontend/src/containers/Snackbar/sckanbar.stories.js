import React from "react"
import { storiesOf } from "@storybook/react"
import { types } from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import Snackbar from "./Snackbar"
import snackbar from "Sagas/snackbar"

storiesOf("Containers/Snackbar")
  .add("All", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    let kinds = ["default", "success", "info", "warning", "error"],
      timeout = 0

    kinds.forEach(kind => {
      timeout += 500

      setTimeout(() => {
        store.dispatch({
          type: types.NOTIFICATION_SHOW,
          payload: {
            message: kind,
            type: kind,
          },
        })
      }, timeout)
    })
    return story
  })
  .add("Default", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    setTimeout(() => {
      store.dispatch({
        type: types.NOTIFICATION_SHOW,
        payload: {
          message: "Default",
          type: "default",
        },
      })
    }, 500)
    return story
  })
  .add("Success", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    setTimeout(() => {
      store.dispatch({
        type: types.NOTIFICATION_SHOW,
        payload: {
          message: "Success",
          type: "success",
        },
      })
    }, 500)
    return story
  })
  .add("Info", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    setTimeout(() => {
      store.dispatch({
        type: types.NOTIFICATION_SHOW,
        payload: {
          message: "Info",
          type: "info",
        },
      })
    }, 500)
    return story
  })
  .add("Warning", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    setTimeout(() => {
      store.dispatch({
        type: types.NOTIFICATION_SHOW,
        payload: {
          message: "Warning",
          type: "warning",
        },
      })
    }, 500)
    return story
  })
  .add("Error", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    setTimeout(() => {
      store.dispatch({
        type: types.NOTIFICATION_SHOW,
        payload: {
          message: "Error",
          type: "error",
        },
      })
    }, 500)
    return story
  })
  .add("10 Success", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    let timeout = 0

    for (let i = 0; i < 10; i++) {
      timeout += 1

      setTimeout(() => {
        store.dispatch({
          type: types.NOTIFICATION_SHOW,
          payload: {
            message: "Message " + timeout,
            type: "success",
          },
        })
      }, timeout * 250)
    }
    return story
  })
