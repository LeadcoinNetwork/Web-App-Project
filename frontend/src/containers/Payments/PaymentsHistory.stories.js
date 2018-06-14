import React from "react"
import { storiesOf } from "@storybook/react"
import { action, configureActions } from "@storybook/addon-actions"
import * as actions from "actions"

const mockData = require("../../mocks/payments.json")

import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Payments")
  .add("empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/payments",
    })
    return story
  })
  .add("loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/payments",
    })
    return story
  })

  .add("error", () => {
    var { store, story } = createStoreAndStory({
      path: "/payments",
    })
    return story
  })
