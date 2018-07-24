import React from "react"
import { storiesOf } from "@storybook/react"
import Select from "./select"

storiesOf("Components/Select", module)
  .add("without data", () => <Select> </Select>)
  .add("with data (single value)", () => (
    <Select options={["Options 1", "Options 2"]} />
  ))
  .add("with data (tupples)", () => (
    <Select options={[["Option 1 value", "Option 1 text"]]} />
  ))
  .add("with children", () => (
    <Select>
      <option value="Option 1"> Option 1 </option>
    </Select>
  ))
  .add("with children & data", () => (
    <Select options={["Option 1", "Option 2"]}>
      <option value="Option 3"> Option 3 </option>
    </Select>
  ))
  .add("with data & disabled", () => (
    <Select options={["Option 1", "Option 2"]} disabled={true} />
  ))
  .add("with onChange function", () => (
    <Select options={["Option 1", "Option 2"]} onChange={e => alert(e)} />
  ))
  .add("with option picked", () => (
    <Select options={["Option 1", "Option 2"]} value={"Option 2"} />
  ))
  .add("with error", () => (
    <Select options={["Option 1", "Option 2"]} errorText="Click me!" />
  ))
