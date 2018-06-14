import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import Button from "./Button"

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ))
}

createStoryInDesignDecoration("Components/Button")
  .add("with label", () => <Button label="Hello" />)
  .add("with click", () => (
    <Button label="Click me" onClick={() => alert("Clicked!")} />
  ))
  .add("with loading witout text", () => (
    <Button label="Click me" loading={true} Click={() => alert("Clicked!")} />
  ))
  .add("with loading with text text", () => (
    <Button
      label="Click me"
      loading={true}
      loadingText="my text"
      Click={() => alert("Clicked!")}
    />
  ))
