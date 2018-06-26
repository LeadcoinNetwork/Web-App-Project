import React from "react"
import { storiesOf } from "@storybook/react"
import Button from "./Button"

storiesOf("Components/Button")
  .add("With Text", () => <Button label="Hello" />)
  .add("Secondary", () => <Button label="Hello" isSecondary={true} />)
  .add("With Click", () => (
    <Button label="Click me" onClick={() => alert("Clicked!")} />
  ))
  .add("With Loading (default text)", () => (
    <Button label="Click me" loading={true} Click={() => alert("Clicked!")} />
  ))
  .add("with loading with text", () => (
    <Button
      label="Click me"
      loading={true}
      loadingLabel="my text"
      Click={() => alert("Clicked!")}
    />
  ))
  .add("Disabled", () => <Button label="Click me" disabled={true} />)
  .add("Secondary Disabled", () => (
    <Button label="Click me" isSecondary={true} disabled={true} />
  ))
  .add("With App Style", () => <Button label="Click me" appStyle={true} />)
  .add("With App Style Disabled", () => (
    <Button label="Click me" appStyle={true} disabled={true} />
  ))
  .add("With App Style Secondary", () => (
    <Button label="Click me" isSecondary={true} appStyle={true} />
  ))
  .add("With App Style Secondary Disabled", () => (
    <Button
      label="Click me"
      appStyle={true}
      isSecondary={true}
      disabled={true}
    />
  ))
