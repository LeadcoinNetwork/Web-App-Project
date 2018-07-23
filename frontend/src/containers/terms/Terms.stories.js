import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/Terms", module)
  .add("terms & conditions - logged out", () => {
    var { store, story } = createStoreAndStory({
      path: "/terms",
      loggedIn: false,
    })
    return story
  })
  .add("terms & conditions - logged in", () => {
    var { store, story } = createStoreAndStory({
      path: "/terms",
      loggedIn: true,
    })
    return story
  })
