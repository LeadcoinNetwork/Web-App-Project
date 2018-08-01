import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

const mockData = require("../../mocks/notifications.json")

storiesOf("Containers/Notification Table", module)
  .add("Empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
      loggedIn: true,
    })
    return story
  })
  .add("6 Elements", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
      loggedIn: true,
    })
    store.dispatch(actions.notificationsTable.notificationsTableLoadingStart())
    store.dispatch(
      actions.notificationsTable.notificationsTableUpdate(mockData.noti6un4),
    )
    store.dispatch(actions.notificationsTable.notificationsTableLoadingEnd())
    return story
  })
  .add("Loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
      loggedIn: true,
    })
    store.dispatch(actions.notificationsTable.notificationsTableLoadingStart())
    return story
  })

  .add("Error", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
      loggedIn: true,
    })
    store.dispatch(actions.notificationsTable.notificationsTableLoadingStart())
    store.dispatch(actions.notificationsTable.notificationsTableLoadingEnd())
    store.dispatch(
      actions.notificationsTable.notificationsTableError(
        "Error receiving notifications",
      ),
    )
    return story
  })
