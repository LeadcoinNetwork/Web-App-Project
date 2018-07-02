import React from "react"
import { storiesOf } from "@storybook/react"
import Select from "./Select"


storiesOf("Components/Select",module)
  .add("without data", () => <Select> </Select> )
  .add("with data (single value)", () => (
    <Select options={['Options 1', 'Options 2']}> 
    </Select>
  ))
  .add("with data (tupples)", () => (
    <Select options={[['Option 1 value', 'Option 1 text']]}> 
    </Select>
  ))
  .add("with children", () => (
    <Select> 
      <option value="Option 1"> Option 1 </option>
    </Select>
  ))
  .add("with children & data", () => (
    <Select options={['Option 1', 'Option 2']}> 
      <option value="Option 3"> Option 3 </option>
    </Select>
  ))
  .add("with data & disabled", () => (
    <Select options={['Option 1', 'Option 2']} disabled={true}> 
    </Select>
  ))
  .add("with onChange function", () => (
    <Select options={['Option 1', 'Option 2']} onChange={(e) => alert(e)} >
    </Select>
  ))
  .add("with option picked", () => (
    <Select options={['Option 1', 'Option 2']} value={'Option 2'} >
    </Select>
  ))
  .add("with error", () => (
    <Select options={['Option 1', 'Option 2']} errorText="Click me!" >
    </Select>
  ))