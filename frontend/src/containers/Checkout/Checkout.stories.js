import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

const mockData = require("../../mocks/shopping-cart.json")

storiesOf("Containers/Checkout", module)
  .add("Checkout - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/checkout",
      loggedIn: true,
    })
    return story
  })
  .add("Checkout - 6 items", () => {
    var { store, story } = createStoreAndStory({
      path: "/checkout",
      loggedIn: true,
    })
    store.dispatch(actions.checkout.checkoutShoppingCartUpdate(mockData))
    return story
  })
  .add("Checkout - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/checkout",
      loggedIn: true,
    })
    store.dispatch(actions.checkout.checkoutShoppingCartUpdate(mockData))
    store.dispatch(actions.checkout.checkoutLoadingStart())
    return story
  })

  .add("Checkout - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/checkout",
      loggedIn: true,
    })
    store.dispatch(actions.checkout.checkoutShoppingCartUpdate(mockData))
    store.dispatch(actions.checkout.checkoutError("Server processing error"))
    return story
  })
