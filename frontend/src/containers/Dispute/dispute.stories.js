import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Dispute")
  .add("Dispute - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/dispute",
      loggedIn: true,
    })
    return story
  })
  .add("Dispute - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/dispute",
      loggedIn: true,
    })
    return story
  })

  .add("Dispute - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/dispute",
      loggedIn: true,
    })
    return story
  })
