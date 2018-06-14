import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import NotificationElement from "./"
import NotificationInner from "./NotificationInner"
import { withState } from "@dump247/storybook-state"

const notifications = require("../../mocks/notifications.json")

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ))
}

storiesOf("Containers/Notification Element")
  .add("No Notification", () => (
    <NotificationElement
      unreadCount={0}
      notifications={[]}
      handleToggle={() => {
        alert("toggle clicked")
      }}
    />
  ))
  .add("6 Notification closed", () => {
    let unreadCount = notifications.filter(notification => notification.unread)
      .length
    return (
      <NotificationElement
        unreadCount={unreadCount}
        notifications={notifications}
        opened={false}
        handleToggle={() => {
          alert("toggle clicked")
        }}
      />
    )
  })
  .add("6 Notification opened", () => {
    let unreadCount = notifications.filter(notification => notification.unread)
      .length
    return (
      <NotificationElement
        unreadCount={unreadCount}
        notifications={notifications}
        opened={true}
        handleToggle={() => {
          alert("toggle clicked")
        }}
        handleSeeAll={() => {
          alert("See all clicked")
        }}
      />
    )
  })
  .add("14 Notification closed", () => {
    return (
      <NotificationElement
        unreadCount={14}
        notifications={notifications}
        opened={false}
        handleToggle={() => {
          alert("handleToggle clicked")
        }}
      />
    )
  })
  .add(
    "6 Notification with state",
    withState({
      opened: false,
      notifications,
    })(({ store }) => {
      let unreadCount = store.state.notifications.filter(
        notification => notification.unread,
      ).length
      return (
        <NotificationElement
          unreadCount={unreadCount}
          notifications={notifications}
          opened={store.state.opened}
          anchorEl={store.state.anchorEl}
          handleToggle={() => store.set({ opened: !store.state.opened })}
          handleSeeAll={() => {
            alert("See all clicked")
          }}
        />
      )
    }),
  )
