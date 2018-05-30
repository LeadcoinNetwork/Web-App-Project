import "../src/styles/global.scss";
import React from "react";
import { storiesOf } from "@storybook/react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Button from "../src/components/Button";
import Table from "../src/components/Table";

const fields = require("../src/containers/TableData/fields.json");
const leads = require("../src/containers/TableData/records.json");

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ));
}

createStoryInDesignDecoration("Button")
  .add("with label", () => <Button label="Hello" />)
  .add("with click", () => (
    <Button label="Click me" onClick={() => alert("Clicked!")} />
  ));

createStoryInDesignDecoration("Table").add("with leads", () => (
  <Table
    fields={fields}
    records={leads}
    multipleSelectionButton="Buy Selected Leads"
    multipleSelectionAction={console.log}
    recordMainButton="Buy"
    recordMainAction={console.log}
  />
));

class abc extends React.Component {
  /**
   * @param props {{a:string}} - The props...
   */
  constructor(props) {
    super(props);
  }
  render() {
    return null;
  }
}

// var d = <abc
