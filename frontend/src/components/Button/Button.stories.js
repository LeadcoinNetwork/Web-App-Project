import React from "react";
import { storiesOf } from "@storybook/react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Button from "./Button";

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
