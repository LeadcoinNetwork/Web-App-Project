import React from "react"
import { storiesOf } from "@storybook/react"
import { userProfileSettings } from "Actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/User Profile Settings", module)
  .add("empty form", () => {
    var { store, story } = createStoreAndStory({
      path: "/user-profile-settings",
      loggedIn: true,
    })
    return story
  })

  .add("loading state", () => {
    var { store, story } = createStoreAndStory({
      path: "/user-profile-settings",
      loggedIn: true,
    })
    store.dispatch(userProfileSettings.userProfileSettingsLoading())
    return story
  })

  .add("error form", () => {
    var { store, story } = createStoreAndStory({
      path: "/user-profile-settings",
      loggedIn: true,
    })
    store.dispatch(
      userProfileSettings.userProfileSettingsError("Example Error"),
    )
    return story
  })
