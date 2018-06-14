import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import Dispute from "./Dispute"
storiesOf("Containers/Dispute")
  .add("Dispute - empty", () => {
    var { store, story } = createStoreAndStory({
      component: Dispute,
    })
    return story
  })
  .add("Dispute - loading", () => {
    var { store, story } = createStoreAndStory({
      component: Dispute,
    })
    return story
  })

  .add("Dispute - error", () => {
    var { store, story } = createStoreAndStory({
      component: Dispute,
    })
    return story
  })
