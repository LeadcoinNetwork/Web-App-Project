import React from "react";
import { storiesOf } from "@storybook/react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PaymentHistory from "./PaymentHistory";

const payments = require("../../mocks/payments.json");

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ));
}

createStoryInDesignDecoration("Payment History").add("Table", () => (
  <PaymentHistory payments={payments} />
));
