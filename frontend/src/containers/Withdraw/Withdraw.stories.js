import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { withdraw, balance } from "Actions"

storiesOf("Containers/Withdraw", module)
  .add("balance 450 available 400", () => {
    var { store, story } = createStoreAndStory({
      path: "/withdraw",
      loggedIn: true,
    })
    store.dispatch(balance.balanceUpdate(450, 50))
    return story
  })
  .add("loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/withdraw",
      loggedIn: true,
    })
    store.dispatch(balance.balanceUpdate(450, 50))
    store.dispatch(withdraw.withdrawPageSubmit())
    store.dispatch(withdraw.withdrawPageLoadingStart())
    return story
  })

  .add("error", () => {
    var { store, story } = createStoreAndStory({
      path: "/withdraw",
      loggedIn: true,
    })
    store.dispatch(balance.balanceUpdate(450, 50))
    store.dispatch(withdraw.withdrawPageError("Error processing request"))
    return story
  })
