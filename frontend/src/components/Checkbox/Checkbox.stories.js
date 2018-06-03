import React from "react";
import { storiesOf } from "@storybook/react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Checkbox from "./Checkbox";

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ));
}

class CheckboxState extends React.Component {
  constructor() {
    super();
    this.state = { checked: true };
  }
  render() {
    return (
      <Checkbox
        checked={this.state.checked}
        onClick={() => {
          this.setState({ checked: !this.state.checked });
        }}
      />
    );
  }
}
createStoryInDesignDecoration("UI/Checkbox").add("check checkbox", () => (
  <CheckboxState />
));
