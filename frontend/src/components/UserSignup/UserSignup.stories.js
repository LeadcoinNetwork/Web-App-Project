import React from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { storiesOf } from "@storybook/react"
import UserSignUp from "./UserSignup"

storiesOf("users/signup").add("form", () => (
  <MuiThemeProvider>
    <UserSignUp />
  </MuiThemeProvider>
))
