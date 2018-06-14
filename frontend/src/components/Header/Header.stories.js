import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { action } from "@storybook/addon-actions"
import Header from "./Header"

storiesOf("Containers/Notification Status Bar").add("no elemnts", () => (
  <Header
    notifications={{ current: { message: "", type: "" } }}
    push={action("push")}
  />
))
