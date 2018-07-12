import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { user } from "Actions"

storiesOf("Containers/SideMenu", module)
  .add("Login", () => {
    let { store, story } = createStoreAndStory({ path: "/login" })

    store.dispatch(user.loggedOut())

    return story
  })
  .add("Sell", () => {
    let { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
    })

    return story
  })
  .add("Buy", () => {
    let { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })

    return story
  })
  .add("My", () => {
    let { store, story } = createStoreAndStory({
      path: "/my-leads",
      loggedIn: true,
    })

    return story
  })
