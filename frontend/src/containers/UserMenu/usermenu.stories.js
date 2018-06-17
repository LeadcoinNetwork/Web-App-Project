import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

import { specs, describe, it } from "storybook-addon-specifications"
import { mount } from "enzyme"
import { types } from "actions"
import expect from "expect"

import UserMenu from "./UserMenu"

storiesOf("Containers/User Menu")
  .add("closed", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })
    return story
  })
  .add("opened", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })

    return story
  })

  .add("should change state getState().usermenu.open onClick", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })

    return story
  })
