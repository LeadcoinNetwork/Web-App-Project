import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"
import * as actions from "../../actions"

storiesOf("Containers/Balance Widget", module)
  .add("balance 0", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    store.dispatch(actions.balance.balanceWidgetUpdate(0, 0))
    return story
  })
  .add("Balance 10,50", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    store.dispatch(actions.balance.balanceWidgetUpdate(10, 50))
    return story
  })
  .add("Balance loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    store.dispatch(actions.balance.balanceWidgetLoadingStart())
    return story
  })
