import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

const mockdata = require("../../mocks/notifications.json")

import NotificationElement from "./NotificationElement"

storiesOf("Containers/Notification Element", module)
  .add("Empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/my-leads",
    })
    store.dispatch(actions.user.loggedIn({ id: 123 }))
    return story
  })

  .add("Empty opened", () => {
    var { store, story } = createStoreAndStory({
      path: "/my-leads",
    })
    store.dispatch(actions.user.loggedIn({ id: 123 }))
    store.dispatch(actions.notifications.notificationsShow([], 0))
    return story
  })

  .add("Have 6 unread 4", () => {
    var { store, story } = createStoreAndStory({
      path: "/my-leads",
    })
    store.dispatch(actions.user.loggedIn({ id: 123 }))
    store.dispatch(
      actions.notifications.notificationsUpdate(
        mockdata.noti6un4,
        mockdata.noti6un4.filter(notification => notification.unread).length,
      ),
    )
    return story
  })

  .add("have 6 unread 4 opened", () => {
    var { store, story } = createStoreAndStory({
      path: "/my-leads",
    })
    store.dispatch(actions.user.loggedIn({ id: 123 }))
    store.dispatch(
      actions.notifications.notificationsUpdate(
        mockdata.noti6un4,
        mockdata.noti6un4.filter(notification => notification.unread).length,
      ),
    )
    store.dispatch(actions.notifications.notificationsShow())
    return story
  })

  .add("have 15 unread 14", () => {
    var { store, story } = createStoreAndStory({
      path: "/my-leads",
    })
    store.dispatch(actions.user.loggedIn({ id: 123 }))
    store.dispatch(
      actions.notifications.notificationsUpdate(
        mockdata.noti15un14,
        mockdata.noti15un14.filter(notification => notification.unread).length,
      ),
    )
    return story
  })
