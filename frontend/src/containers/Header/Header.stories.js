import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { user } from "Actions"

storiesOf("Containers/Header", module)
  .add("Logged out", () => {
    var { store, story } = createStoreAndStory({
      path: "/login",
    })

    store.dispatch(user.loggedOut())
    return story
  })
  .add("Logged in", () => {
    var { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
    })

    return story
  })
  .add("Logged in - disabled", () => {
    var { store, story } = createStoreAndStory({
      path: "/complete-registration",
      loggedIn: true,
    })

    store.dispatch(
      user.loggedIn({
        id: 1,
        email: "meir@leadcoin.network",
        disabled: "PROFILE_NOT_COMPLETED",
      }),
    )

    return story
  })
