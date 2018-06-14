import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import NotificationElement from "Containers/NotificationElement"

const notifications = require("../../mocks/notifications.json")

storiesOf("Containers/Notification Element", module)
  .add("empty", () => {
    var { store, story } = createStoreAndStory({
      component: NotificationElement,
    })
    return story
  })

  .add("empty opened", () => {
    var { store, story } = createStoreAndStory({
      component: NotificationElement,
    })
    return story
  })

  .add("have 6 unread 4", () => {
    var { store, story } = createStoreAndStory({
      component: NotificationElement,
    })
    store.dispatch(
      actions.notifications.updateNotifications(
        notifications,
        notifications.filter(notification => notification.unread).length,
      ),
    )
    return story
  })

  .add("have 6 unread 4 opened", () => {
    var { store, story } = createStoreAndStory({
      component: NotificationElement,
    })
    store.dispatch(
      actions.notifications.updateNotifications(
        notifications,
        notifications.filter(notification => notification.unread).length,
      ),
    )
    store.dispatch(actions.notifications.showNotifications())
    return story
  })
