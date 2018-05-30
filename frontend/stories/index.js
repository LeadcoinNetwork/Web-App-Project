import React from "react";
import { storiesOf } from "@storybook/react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Button from "../src/components/Button";

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ));
}

createStoryInDesignDecoration("a/a")
  .add("with text/a", () => <Button label="Hello1" />)
  .add("with text/b", () => <Button label="Hello2" />);

createStoryInDesignDecoration("a/b")
  .add("with text/a", () => <Button label="Hello1" />)
  .add("with text/b", () => <Button label="Hello2" />);
