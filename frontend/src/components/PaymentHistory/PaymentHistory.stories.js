import React from "react";
import { storiesOf } from "@storybook/react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NotificationsTable from "./PaymentHistory";

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ));
}

createStoryInDesignDecoration("Payment History").add("Empty Table", () => (
  <NotificationsTable />
));
