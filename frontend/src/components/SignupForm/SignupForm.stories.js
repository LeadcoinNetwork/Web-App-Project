import React from "react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { storiesOf } from "@storybook/react"
import SignupForm from "./SignupForm"

storiesOf("users/signup").add("form", () => (
  <MuiThemeProvider>
    <SignupForm />
  </MuiThemeProvider>
))
