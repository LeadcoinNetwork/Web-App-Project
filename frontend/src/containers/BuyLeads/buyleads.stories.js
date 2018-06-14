import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Buy Leads")
  .add("Buy Leads - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/users/complete-registration",
    })
    return story
  })
  .add("Buy Leads - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/users/complete-registration",
    })
    return story
  })

  .add("Buy Leads - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/users/complete-registration",
    })
    return story
  })
