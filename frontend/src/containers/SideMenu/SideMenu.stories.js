import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"
import { user } from "Actions"

storiesOf("Containers/SideMenu", module)
  .add("Sell", () => {
    let { store, story } = createStoreAndStory({ path: "/sell-leads" })

    store.dispatch(user.loggedIn({ id: 1 }))

    return story
  })
  .add("Buy", () => {
    let { store, story } = createStoreAndStory({ path: "/buy-leads" })

    store.dispatch(user.loggedIn({ id: 1 }))

    return story
  })
  .add("My", () => {
    let { store, story } = createStoreAndStory({ path: "/my-leads" })

    store.dispatch(user.loggedIn({ id: 1 }))

    return story
  })
