import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

const mockData = require("../../mocks/notifications.json")

storiesOf("Containers/Notification Table")
  .add("Empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
    })
    return story
  })
  .add("6 Elements", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
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
    })
    store.dispatch(actions.notificationsTable.notificationsTableLoadingStart())
    return story
  })

  .add("Error", () => {
    var { store, story } = createStoreAndStory({
      path: "/notifications",
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
