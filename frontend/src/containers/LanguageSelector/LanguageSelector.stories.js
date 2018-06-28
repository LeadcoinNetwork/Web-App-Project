import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"
import { language } from "Actions"

storiesOf("Containers/Language Selector", module)
  .add("Logged out", () => {
    var { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: false
    })

    return story
  })
  .add("Logged in", () => {
    var { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
    })

    return story
  })