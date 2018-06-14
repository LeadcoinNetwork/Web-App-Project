import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Sell Leads")
  .add("Sell Leads - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/users/complete-registration",
    })
    return story
  })
  .add("Sell Leads - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/users/complete-registration",
    })
    return story
  })

  .add("Sell Leads - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/users/complete-registration",
    })
    return story
  })
