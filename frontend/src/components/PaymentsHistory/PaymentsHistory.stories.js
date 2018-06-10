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

createStoryInDesignDecoration("Payment History").add("List", () => (
  <PaymentsHistory payments={{ list: payments }} />
))

createStoryInDesignDecoration("Payment History").add("Empty", () => (
  <PaymentsHistory payments={{ list: [] }} />
))

createStoryInDesignDecoration("Payment History").add("Empty loading", () => (
  <PaymentsHistory payments={{ list: [], loading: true }} />
))

createStoryInDesignDecoration("Payment History").add("Full loading", () => (
  <PaymentsHistory payments={{ list: payments, loading: true }} />
))
