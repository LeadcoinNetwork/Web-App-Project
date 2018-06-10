import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import PaymentsHistory from "./PaymentsHistory"

const payments = require("../../mocks/payments.json")

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ))
}

createStoryInDesignDecoration("Payment History").add("Table", () => (
  <PaymentsHistory payments={payments} />
))
