import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import UserSettings from "./UserSettings";

storiesOf("Containers/User Settings", module)
  .add("empty form", () => {
    var { store, story } = createStoreAndStory({ component: UserSettings })
    return story
  })

  .add("loading state", () => {
    var { store, story } = createStoreAndStory({ component: UserSettings })
    store.dispatch(actions.userSettings.userSettingsLoading())
    return story
  })

  .add("error form", () => {
    var { store, story } = createStoreAndStory({ component: UserSettings })
    store.dispatch(
      actions.userSettings.userSettingsError("Example Error"),
    )
    return story
  })