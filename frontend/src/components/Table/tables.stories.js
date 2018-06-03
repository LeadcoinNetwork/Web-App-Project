import React from "react";
import { storiesOf } from "@storybook/react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Table from "./Table";

const fields = require("../../containers/TableData/fields.json");
const leads = require("../../containers/TableData/records.json");

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
