import React from "react"
import { storiesOf } from "@storybook/react"
import { userSettings } from "Actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/User Settings", module)
  .add("empty form", () => {
    var { store, story } = createStoreAndStory({
      path: "/user-settings",
      loggedIn: true,
    })
    return story
  })

  .add("loading state", () => {
    var { store, story } = createStoreAndStory({
      path: "/user-settings",
      loggedIn: true,
    })
    store.dispatch(userSettings.userSettingsLoading())
    return story
  })

  .add("error form", () => {
    var { store, story } = createStoreAndStory({
      path: "/user-settings",
      loggedIn: true,
    })
    store.dispatch(userSettings.userSettingsError("Example Error"))
    return story
  })
