import React from "react"
import { storiesOf } from "@storybook/react"
import { completeRegistration } from "Actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Complete registration").add("empty", () => {
  var { store, story } = createStoreAndStory({
    path: "/complete-registration",
  })
  return story
})
