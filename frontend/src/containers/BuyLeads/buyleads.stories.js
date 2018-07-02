import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Buy Leads", module)
  .add("Buy Leads - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    return story
  })
  .add("Buy Leads - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    return story
  })

  .add("Buy Leads - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    return story
  })
