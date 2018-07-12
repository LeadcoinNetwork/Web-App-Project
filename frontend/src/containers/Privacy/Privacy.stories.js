import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/Privacy", module)
  .add("privacy - logged out", () => {
    var { store, story } = createStoreAndStory({
      path: "/privacy",
      loggedIn: false,
    })
    return story
  })
  .add("privacy - logged in", () => {
    var { store, story } = createStoreAndStory({
      path: "/privacy",
      loggedIn: true,
    })
    return story
  })
