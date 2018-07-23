import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import * as actions from "../../actions"

storiesOf("Containers/Balance Widget", module)
  .add("balance 0", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    store.dispatch(actions.balance.balanceUpdate(0))
    return story
  })
  .add("Balance 50", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    store.dispatch(actions.balance.balanceUpdate(50))
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
