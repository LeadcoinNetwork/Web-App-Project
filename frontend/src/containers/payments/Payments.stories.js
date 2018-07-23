import React from "react"
import { storiesOf } from "@storybook/react"
import { action, configureActions } from "@storybook/addon-actions"
import * as actions from "actions"

const mockData = require("../../mocks/payments.json")

import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/Payments", module)
  .add("empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/payments",
      loggedIn: true,
    })
    store.dispatch(actions.payments.paymentsHistoryLoadingStart())
    store.dispatch(actions.payments.paymentsHistoryLoadingEnd())
    store.dispatch(actions.payments.paymentsHistoryUpdate([]))
    return story
  })
  .add("loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/payments",
      loggedIn: true,
    })
    store.dispatch(actions.payments.paymentsHistoryLoadingStart())
    return story
  })
  .add("full", () => {
    var { store, story } = createStoreAndStory({
      path: "/payments",
      loggedIn: true,
    })
    store.dispatch(actions.payments.paymentsHistoryLoadingStart())
    store.dispatch(actions.payments.paymentsHistoryLoadingEnd())
    store.dispatch(actions.payments.paymentsHistoryUpdate(mockData))
    return story
  })
  .add("error", () => {
    var { store, story } = createStoreAndStory({
      path: "/payments",
      loggedIn: true,
    })
    store.dispatch(actions.payments.paymentsHistoryLoadingStart())
    store.dispatch(actions.payments.paymentsHistoryLoadingEnd())
    store.dispatch(
      actions.payments.paymentsHistoryError("Error retriving records"),
    )
    return story
  })
