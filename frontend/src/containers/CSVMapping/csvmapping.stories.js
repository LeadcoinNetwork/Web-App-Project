import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import CSVMapping from "./CSVMapping"

storiesOf("Containers/CSVMapping")
  .add("CSVMapping - empty", () => {
    var { store, story } = createStoreAndStory({
      component: CSVMapping,
    })
    return story
  })
  .add("CSVMapping - loading", () => {
    var { store, story } = createStoreAndStory({
      component: CSVMapping,
    })
    return story
  })

  .add("CSVMapping - error", () => {
    var { store, story } = createStoreAndStory({
      component: CSVMapping,
    })
    return story
  })
