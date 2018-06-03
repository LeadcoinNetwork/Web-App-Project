import React from "react";
import { storiesOf } from "@storybook/react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Table from "./";

const fields = require("../../mocks/fields.json");
const leads = require("../../mocks/leads.json");

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ));
}

createStoryInDesignDecoration("Table").add("with leads", () => (
  <Table
    fields={fields}
    records={leads}
    multipleSelectionButton="Buy Selected Leads"
    multipleSelectionAction={console.log}
    recordMainButton="Buy"
    recordMainAction={console.log}
    onScrollBottom={cb => cb()}
  />
));
