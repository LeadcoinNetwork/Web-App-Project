import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"
import BuyLoads from "./BuyLeads"

storiesOf("Containers/Buy Leads")
  .add("Buy Leads - empty", () => {
    var { store, story } = createStoreAndStory({
      component: BuyLoads,
    })
    return story
  })
  .add("Buy Leads - loading", () => {
    var { store, story } = createStoreAndStory({
      component: BuyLoads,
    })
    return story
  })

  .add("Buy Leads - error", () => {
    var { store, story } = createStoreAndStory({
      component: BuyLoads,
    })
    return story
  })
