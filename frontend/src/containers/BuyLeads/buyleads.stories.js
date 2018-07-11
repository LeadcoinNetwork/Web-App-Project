import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"
import * as actions from "actions"

storiesOf("Containers/Buy Leads", module)
  .add("Buy Leads - empty", () => {
    let { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    return story
  })
  .add("Buy Leads - loading", () => {
    let { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    store.dispatch(actions.leads.fetchLeads("BUY_LEADS"))
    return story
  })
  .add("Buy Leads - with mock fields", () => {
    let leadsMock = require("../../mocks/leads.json")

    let { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    setTimeout(() => {
      store.dispatch(
        actions.leads.fetchSuccess("BUY_LEADS", {
          list: leadsMock,
          page: 0,
          limit: 2,
          total: leadsMock.length,
        }),
      )
    }, 500)
    return story
  })
