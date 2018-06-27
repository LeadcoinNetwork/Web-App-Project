import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Withdraw")
  .add("empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/withdraw",
      loggedIn: true,
    })
    return story
  })
  .add("loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/withdraw",
      loggedIn: true,
    })
    return story
  })

  .add("error", () => {
    var { store, story } = createStoreAndStory({
      path: "/withdraw",
      loggedIn: true,
    })
    return story
  })
