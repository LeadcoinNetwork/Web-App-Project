import React from "react";
import { storiesOf } from "@storybook/react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NotificationElement from "./NotificationElement";
import NotificationInner from "./NotificationInner";

const notifications = require("../../mocks/notifications.json");

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ));
}

createStoryInDesignDecoration("Notification Element")
  .add("No Notification", () => (
    <NotificationElement unreadCount={0} notifications={[]} />
  ))
  .add("6 Notification closed", () => {
    let unreadCount = notifications.filter(notification => notification.unread)
      .length;
    return (
      <NotificationElement
        unreadCount={unreadCount}
        notifications={notifications}
        opened={false}
        toggel={() => alert("toggel clicked")}
      />
    );
  })
  .add("6 Notification opened", () => {
    let unreadCount = notifications.filter(notification => notification.unread)
      .length;
    return (
      <NotificationElement
        unreadCount={unreadCount}
        notifications={notifications}
        opened={true}
        toggel={() => alert("toggel clicked")}
      />
    );
  });
createStoryInDesignDecoration("Notification Element/inner").add(
  "6 Inner Notification",
  () => {
    let unreadCount = notifications.filter(notification => notification.unread)
      .length;
    return (
      <NotificationInner
        unreadCount={unreadCount}
        notifications={notifications}
      />
    );
  }
);
