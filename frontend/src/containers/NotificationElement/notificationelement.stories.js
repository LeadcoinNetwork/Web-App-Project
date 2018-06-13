import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

function abc() {
  return <div>hi</div>
}

storiesOf("App/Notification Element", module)
  .add("empty", () => {
    var { store, story } = createStoreAndStory({ component: abc })
    return story
  })

  .add("have 5", () => {
    var { store, story } = createStoreAndStory({ component: abc })
    return story
  })

  .add("empty opened", () => {
    var { store, story } = createStoreAndStory({ component: abc })
    return story
  })

  .add("have 5 opened", () => {
    var { store, story } = createStoreAndStory({ component: abc })
    return story
  })
