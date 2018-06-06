// External Modules
import React from "react";
import { storiesOf } from "@storybook/react";

// Optional modules, if you use in your stories
import { action, configureActions } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";

// https://github.com/storybooks/storybook/tree/release/3.4/addons/knobs
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
  button
} from "@storybook/addon-knobs/react";

// createStory("Example Stories", module)
storiesOf("Example Stories", module)
  .add("action", () => (
    <div onClick={action("clicked")}>Click Here to see an example action</div>
  ))
  .add("link", () => (
    <div onClick={linkTo("Example Stories", "action")}>
      Click here to link to other story
    </div>
  ))
  .add(
    "with state",
    withState({})(({ store }) => (
      <div
        onClick={() => {
          store.set({ clicked: !store.state.clicked });
        }}
      >
        Click to toggle - {store.state.clicked ? "off" : "on"}
      </div>
    ))
  )
  .add(
    "With Info",
    withInfo("This is the info")(() => (
      <div>
        {boolean(0, 1)} - {text("a", "b")}
      </div>
    ))
  );

storiesOf("Example Stories/with nobs")
  .addDecorator(withKnobs)
  .add("With Knob", () => (
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
  ));
