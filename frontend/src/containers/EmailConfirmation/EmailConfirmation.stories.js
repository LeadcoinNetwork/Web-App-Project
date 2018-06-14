import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Email Confirmations")
  .add("Empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/email-confirmation",
    })
    return story
  })
  .add("Already Confirmed", () => {
    var { store, story } = createStoreAndStory({
      path: "/email-confirmation",
    })
    return story
  })

  .add("Resending", () => {
    var { store, story } = createStoreAndStory({
      path: "/email-confirmation",
    })
    return story
  })

  .add("sent success", () => {
    var { store, story } = createStoreAndStory({
      path: "/email-confirmation",
    })
    return story
  })
  .add("sent errro", () => {
    var { store, story } = createStoreAndStory({
      path: "/email-confirmation",
    })
    return story
  })
