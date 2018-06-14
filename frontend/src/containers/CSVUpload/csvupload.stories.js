import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import CSVUpload from "./CSVUpload"

storiesOf("Containers/CVSUpload")
  .add("CVSUpload - empty", () => {
    var { store, story } = createStoreAndStory({
      component: CSVUpload,
    })
    return story
  })
  .add("CVSUpload - loading", () => {
    var { store, story } = createStoreAndStory({
      component: CSVUpload,
    })
    return story
  })

  .add("CVSUpload - error", () => {
    var { store, story } = createStoreAndStory({
      component: CSVUpload,
    })
    return story
  })
