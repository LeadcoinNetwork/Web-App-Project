import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Sell Leads", module)
  .add("Sell Leads - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
    })
    return story
  })
  .add("Sell Leads - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
    })
    return story
  })

  .add("Sell Leads - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
    })
    return story
  })
