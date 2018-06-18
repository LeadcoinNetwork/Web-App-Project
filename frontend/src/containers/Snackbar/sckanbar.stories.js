import React from "react"
import { storiesOf } from "@storybook/react"
import { types } from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import Snackbar from "./Snackbar"
import snackbar from "Sagas/snackbar"

storiesOf("Containers/Snackbar")
  .add("empty", () => {
    var { store, story } = createStoreAndStory({
      component: Snackbar,
    })
    return story
  })
  .add("Success", () => {
    var { store, story } = createStoreAndStory({
      component: Snackbar,
      sagaFunction: snackbar,
    })
    store.dispatch({
      type: types.NOTIFICATION_SHOW,
      payload: {
        message: "Success",
        type: "success",
      },
    })
    return story
  })
