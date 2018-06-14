import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import MyLeads from "./MyLeads"
storiesOf("Containers/My Leads")
  .add("My Leads - empty", () => {
    var { store, story } = createStoreAndStory({
      component: MyLeads,
    })
    return story
  })
  .add("My Leads - loading", () => {
    var { store, story } = createStoreAndStory({
      component: MyLeads,
    })
    return story
  })

  .add("My Leads - error", () => {
    var { store, story } = createStoreAndStory({
      component: MyLeads,
    })
    return story
  })
