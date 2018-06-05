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

createStoryInDesignDecoration("Table")
  .add("with leads", () => (
    <Table
      fields={fields}
      records={leads}
      multipleSelectionButton="Buy ${number} Leads"
      multipleSelectionAction={console.log}
      recordMainButton="Buy"
      recordMainAction={console.log}
      onScrollBottom={cb => cb()}
    />
  ))
  .add("without leads", () => (
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
  ))
  .add("with onSort action", () => (
    <Table
      fields={fields}
      showOnZeroRecords={<div>No Leads</div>}
      onSort={(key, direction) => {
        alert("sorted by field.key: " + key + " - " + direction);
      }}
      records={leads}
      multipleSelectionButton="Buy Selected Leads"
      multipleSelectionAction={console.log}
      recordMainButton="Buy"
      recordMainAction={console.log}
      onScrollBottom={cb => cb()}
    />
  ))
  .add("with sort asc", () => (
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
  ))
  .add("with sort desc", () => (
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
  ))
  .add("with more button", () => {
    class TableWithButtonForMoreStories extends React.Component {
      constructor(props) {
        super(props);
        this.state = { records: leads.slice(0, 5) };
      }
      loadMore = () => {
        this.setState({
          records: leads.slice(0, 10),
          loaded: true
        });
      };
      render() {
        return (
          <div>
            <button onClick={this.loadMore} disabled={this.state.loaded}>
              More
            </button>
            <Table
              fields={fields}
              records={this.state.records}
              multipleSelectionButton="Buy ${number} Leads"
              multipleSelectionAction={console.log}
              recordMainButton="Buy"
              recordMainAction={console.log}
              onScrollBottom={cb => cb()}
            />
          </div>
        );
      }
    }
    return <TableWithButtonForMoreStories />;
  });
