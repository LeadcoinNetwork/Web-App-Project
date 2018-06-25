import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/My Leads")
  .add("My Leads - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/my-leads",
      loggedIn: true,
    })
    return story
  })
  .add("My Leads - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/my-leads",
      loggedIn: true,
    })
    return story
  })

  .add("My Leads - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/my-leads",
      loggedIn: true,
    })
    return story
  })
