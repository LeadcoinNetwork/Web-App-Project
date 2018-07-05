import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"
import * as actions from "actions"

storiesOf("Containers/Buy Leads", module)
  .add("Buy Leads - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    return story
  })
  .add("Buy Leads - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    return story
  })
  .add("Buy Leads - with mock fields", () => {
    let leadsMock = require('../../mocks/leads.json')

    for (let i = 0; i < 10; i++) {
      leadsMock.push({
        ...leadsMock[i],
        id: i + "t",
      })
    }
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    setTimeout( () => {
      store.dispatch(actions.leads.getLeads({
        list: leadsMock,
        page: 0,
        limit: 2,
        total: leadsMock.length
      }))
    }, 500)
    return story
  })

  .add("Buy Leads - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    return story
  })
