import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"
import { user } from "Actions"

storiesOf("Containers/Header", module)
  .add("Logged out", () => {
    var { store, story } = createStoreAndStory({
      path: "/",
    })

    store.dispatch(user.loggedOut())
    return story
  })
  .add("Logged in", () => {
    var { store, story } = createStoreAndStory({
      path: "/sell-leads",
    })

    store.dispatch(user.loggedIn({ id: 1 }))
    return story
  })
