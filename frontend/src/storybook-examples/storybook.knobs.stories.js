import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import {
  withKnobs,
  text,
  boolean,
  number,
  color,
  object,
  array,
  selectV2,
  date,
  button,
} from "@storybook/addon-knobs/react"

storiesOf("Example Stories/Knobs", module)
  .addDecorator(withKnobs)
  .add("Knob", () => (
    <div>
      Boolean:{boolean("Boolean:") ? "true" : "false"} <br />
      Text: {text("Text", "default value")} <br />
      Number: {number("number", 10, "group2")} <br />
      Color: {color("color", "red", "group2")} <br />
      Array: {array("array", ["value1"])} <br />
      object: {JSON.stringify(object("object", { color: "red" }))} <br />
      selectv2: {selectV2("selectv2", { a: "optiona", b: "optionb" })} <br />
      date: {date("date", new Date())} <br />
      button: {button("button", action("button clicked"))} <br />
    </div>
  ))
