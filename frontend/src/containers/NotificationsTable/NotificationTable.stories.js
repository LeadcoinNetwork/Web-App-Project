import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

const notifications = require("../../mocks/notifications.json")

storiesOf("Containers/Notification Table")
  .add("Empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
    })
    return story
  })
  .add("5 Elements", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
    })
    return story
  })
  .add("Loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
    })
    return story
  })

  .add("Error", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
    })
    return story
  })
