import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { app, types } from "Actions"
import Snackbar from "./Snackbar"
import snackbar from "Sagas/snackbar"
import t from "../../utils/translate/translate"
import { toast } from "react-toastify"

storiesOf("Containers/Snackbar", module)
  .add("All", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    let kinds = [
        t("default"),
        t("success"),
        t("info"),
        t("warning"),
        t("error"),
      ],
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
      () => store.dispatch(app.notificationShow(t("Default"), "default")),
      500,
    )
    return story
  })
  .add("With Link", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })

    setTimeout(() => {
      toast("hi")
      toast(
        <a href="http://google.com" target="_blank">
          hi
        </a>,
      )

      app.notificationShow(
        <div>
          <a>
            '<a href="abc">Hello World</a>'
          </a>abc
        </div>,
        "default",
      )
    }, 50)
    return story
  })
  .add("Success", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })

    setTimeout(
      () => store.dispatch(app.notificationShow(t("Success"), "success")),
      500,
    )
    return story
  })
  .add("Info", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })

    setTimeout(
      () => store.dispatch(app.notificationShow(t("Info"), "info")),
      500,
    )
    return story
  })
  .add("Warning", () => {
    let { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })

    setTimeout(
      () => store.dispatch(app.notificationShow(t("Warning"), "warning")),
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
      () => store.dispatch(app.notificationShow(t("Error"), "error")),
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
          store.dispatch(
            app.notificationShow(t("Timeout") + " " + i * 250, "success"),
          ),
        i * 250,
      )
    }

    return story
  })
