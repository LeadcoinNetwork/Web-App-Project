import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import Checkout from "./Checkout"

storiesOf("Containers/Checkout")
  .add("Checkout - empty", () => {
    var { store, story } = createStoreAndStory({
      component: Checkout,
    })
    return story
  })
  .add("Checkout - loading", () => {
    var { store, story } = createStoreAndStory({
      component: Checkout,
    })
    return story
  })

  .add("Checkout - error", () => {
    var { store, story } = createStoreAndStory({
      component: Checkout,
    })
    return story
  })
