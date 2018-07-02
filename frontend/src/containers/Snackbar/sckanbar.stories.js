import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"
import { app, types } from "Actions"
import Snackbar from "./Snackbar"
import snackbar from "Sagas/snackbar"

storiesOf("Containers/Snackbar", module)
  .add("All", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    let kinds = ["default", "success", "info", "warning", "error"],
      timeout = 0

    kinds.forEach(kind => {
      timeout += 500

      setTimeout(
        () => store.dispatch(app.notificationShow(kind, kind)),
        timeout,
      )
    })
    return story
  })
  .add("Default", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })

    setTimeout(
      () => store.dispatch(app.notificationShow("Default", "default")),
      500,
    )
    return story
  })
  .add("Success", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })

    setTimeout(
      () => store.dispatch(app.notificationShow("Success", "success")),
      500,
    )
    return story
  })
  .add("Info", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })

    setTimeout(() => store.dispatch(app.notificationShow("Info", "info")), 500)
    return story
  })
  .add("Warning", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })

    setTimeout(
      () => store.dispatch(app.notificationShow("Warning", "warning")),
      500,
    )
    return story
  })
  .add("Error", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })

    setTimeout(
      () => store.dispatch(app.notificationShow("Error", "error")),
      500,
    )
    return story
  })
  .add("10 Success", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    let timeout = 0

    for (let i = 1; i <= 10; i++) {
      setTimeout(
        () =>
          store.dispatch(app.notificationShow("Timeout " + i * 250, "success")),
        i * 250,
      )
    }
    return story
  })
