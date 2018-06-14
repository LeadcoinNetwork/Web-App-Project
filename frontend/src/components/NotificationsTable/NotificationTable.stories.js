import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import NotificationsTable from "./NotificationTable"

const notifications = require("../../mocks/notifications.json")

storiesOf("Containers/Notification Table").add("Table", () => (
  <NotificationsTable notifications={notifications} />
))
