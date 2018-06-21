import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import AddLead from "../AddLead"

storiesOf("Containers/AddLead")

  .add("AddLead - empty", () => {
    var { store, story } = createStoreAndStory({
      component: AddLead,
    })
    store.dispatch(actions.addLead.addLeadGetDbFields([
      "date", "name", "phone", "email", "state",
      "city", "property type", "size", "budget",
      "bedrooms", "floor", "specification"
    ]))
    return story
  })
