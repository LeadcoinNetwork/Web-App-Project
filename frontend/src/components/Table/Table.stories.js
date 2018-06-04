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
    multipleSelectionButton="Buy ${number} Leads"
    multipleSelectionAction={console.log}
    recordMainButton="Buy"
    recordMainAction={console.log}
    onScrollBottom={cb => cb()}
  />
));
createStoryInDesignDecoration("Table").add("without leads", () => (
  <Table
    fields={fields}
    showOnZeroRecords={<div>No Leads</div>}
    records={[]}
    multipleSelectionButton="Buy Selected Leads"
    multipleSelectionAction={console.log}
    recordMainButton="Buy"
    recordMainAction={console.log}
    onScrollBottom={cb => cb()}
  />
));

createStoryInDesignDecoration("Table").add("with onSort action", () => (
  <Table
    fields={fields}
    showOnZeroRecords={<div>No Leads</div>}
    onSort={key => {
      alert("sorted by field.key: " + key);
    }}
    records={leads}
    multipleSelectionButton="Buy Selected Leads"
    multipleSelectionAction={console.log}
    recordMainButton="Buy"
    recordMainAction={console.log}
    onScrollBottom={cb => cb()}
  />
));

createStoryInDesignDecoration("Table").add("with sort asc", () => (
  <Table
    fields={fields}
    showOnZeroRecords={<div>No Leads</div>}
    sortedBy={{ key: "state", direction: "asc" }}
    records={leads}
    multipleSelectionButton="Buy Selected Leads"
    multipleSelectionAction={console.log}
    recordMainButton="Buy"
    recordMainAction={console.log}
    onScrollBottom={cb => cb()}
  />
));
createStoryInDesignDecoration("Table").add("with sort desc", () => (
  <Table
    fields={fields}
    showOnZeroRecords={<div>No Leads</div>}
    sortedBy={{ key: "state", direction: "desc" }}
    records={leads}
    multipleSelectionButton="Buy Selected Leads"
    multipleSelectionAction={console.log}
    recordMainButton="Buy"
    recordMainAction={console.log}
    onScrollBottom={cb => cb()}
  />
));
