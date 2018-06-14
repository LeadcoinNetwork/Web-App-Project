import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import UserMenu from "./UserMenu"

storiesOf("Containers/User Menu")
  .add("User Menu - empty", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })
    return story
  })
  .add("User Menu - loading", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })
    return story
  })

  .add("User Menu - error", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })
    return story
  })
