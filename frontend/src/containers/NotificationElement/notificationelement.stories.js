import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import NotificationElement from "Containers/NotificationElement"

const mockdata = require("../../mocks/notifications.json")

storiesOf("Containers/Notification Element", module)
  .add("Empty", () => {
    var { store, story } = createStoreAndStory({
      component: NotificationElement,
    })
    return story
  })

  .add("Error", () => {
    var { store, story } = createStoreAndStory({
      component: NotificationElement,
    })
    store.dispatch(actions.notifications.showNotifications([], 0))
    return story
  })

  .add("Empty opened", () => {
    var { store, story } = createStoreAndStory({
      component: NotificationElement,
    })
    store.dispatch(actions.notifications.showNotifications([], 0))
    return story
  })

  .add("Have 6 unread 4", () => {
    var { store, story } = createStoreAndStory({
      component: NotificationElement,
    })
    store.dispatch(
      actions.notifications.updateNotifications(
        mockdata.noti6un4,
        mockdata.noti6un4.filter(notification => notification.unread).length,
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
        mockdata.noti6un4,
        mockdata.noti6un4.filter(notification => notification.unread).length,
      ),
    )
    store.dispatch(actions.notifications.showNotifications())
    return story
  })

  .add("have 15 unread 14", () => {
    var { store, story } = createStoreAndStory({
      component: NotificationElement,
    })
    store.dispatch(
      actions.notifications.updateNotifications(
        mockdata.noti15un14,
        mockdata.noti15un14.filter(notification => notification.unread).length,
      ),
    )
    return story
  })
