import React from "react"
import { storiesOf } from "@storybook/react"
import Button from "./Button"

storiesOf("Components/Button")
  .add("with label", () => <Button label="Hello" />)
  .add("with click", () => (
    <Button label="Click me" onClick={() => alert("Clicked!")} />
  ))
  .add("with loading witout text", () => (
    <Button label="Click me" loading={true} Click={() => alert("Clicked!")} />
  ))
  .add("with inverted", () => <Button label="Click me" inverted={true} />)

  .add("with loading with text text", () => (
    <Button
      label="Click me"
      loading={true}
      loadingText="my text"
      Click={() => alert("Clicked!")}
    />
  ))
