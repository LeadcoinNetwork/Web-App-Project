import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import PaymentsHistory from "./PaymentsHistory"
import { action, configureActions } from "@storybook/addon-actions"

const payments = require("../../mocks/payments.json")

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ))
}

storiesOf("Containers/Payment History")
  .add("List", () => <PaymentsHistory payments={{ list: payments }} />)

  .add("Empty", () => <PaymentsHistory payments={{ list: [] }} />)

  .add("Empty loading", () => (
    <PaymentsHistory payments={{ list: [], loading: true }} />
  ))

  .add("Full loading", () => (
    <PaymentsHistory payments={{ list: payments, loading: true }} />
  ))

  .add("Test Refresh Button", () => (
    <PaymentsHistory
      onRefresh={action("Refresh Clicked")}
      payments={{ list: payments, loading: true }}
    />
  ))

  .add("Test Edit Button when isDeleteable", () => (
    <PaymentsHistory
      isDeleteable={true}
      onRefresh={action("Refresh Clicked")}
      payments={{ list: payments, loading: true }}
    />
  ))
