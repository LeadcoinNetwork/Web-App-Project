import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Withdraw")
  .add("empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/withdraw",
    })
    return story
  })
  .add("loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/withdraw",
    })
    return story
  })

  .add("error", () => {
    var { store, story } = createStoreAndStory({
      path: "/withdraw",
    })
    return story
  })
