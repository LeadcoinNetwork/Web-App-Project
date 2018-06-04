import React from "react";
import { storiesOf } from "@storybook/react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NotificationElement from "./NotificationElement";
import NotificationInner from "./NotificationInner";

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ));
}

var i = 0;

createStoryInDesignDecoration("Notification Element").add(
  "No Notification",
  () => <NotificationElement unreadCount={0} notifications={[]} />
);

createStoryInDesignDecoration("Notification Element").add(
  "3 Notification",
  () => (
    <NotificationElement
      unreadCount={3}
      notifications={[
        {
          id: 3,
          timestamp: new Date().valueOf(),
          message: "message " + i++,
          unread: true
        },
        {
          id: 3,
          timestamp: new Date().valueOf(),
          message: "message " + i++,
          unread: true
        },
        {
          id: 3,
          timestamp: new Date().valueOf(),
          message: "message " + i++,
          unread: false
        }
      ]}
    />
  )
);
createStoryInDesignDecoration("Notification Element/inner").add(
  "3 Notification",
  () => (
    <NotificationInner
      unreadCount={3}
      notifications={[
        {
          id: 3,
          timestamp: new Date().valueOf(),
          message: "message " + i++,
          unread: true
        },
        {
          id: 3,
          timestamp: new Date().valueOf(),
          message: "message " + i++,
          unread: true
        }
      ]}
    />
  )
);
