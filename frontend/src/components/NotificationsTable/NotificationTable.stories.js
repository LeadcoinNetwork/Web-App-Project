import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import NotificationsTable from "./NotificationTable"

const notifications = require("../../mocks/notifications.json")

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ))
}

createStoryInDesignDecoration("Notification Table").add("Table", () => (
  <NotificationsTable notifications={notifications} />
))
