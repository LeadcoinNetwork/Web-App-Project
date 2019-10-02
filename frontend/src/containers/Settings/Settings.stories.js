import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/Settings", module)
  .add("settings - logged out", () => {
    var { store, story } = createStoreAndStory({
      path: "/settings",
      loggedIn: false,
    })
    return story
  })
  .add("settings - logged in", () => {
    var { store, story } = createStoreAndStory({
      path: "/settings",
      loggedIn: true,
    })
    return story
  })
