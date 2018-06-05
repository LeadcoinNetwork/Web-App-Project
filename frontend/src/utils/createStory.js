import React from "react";
import { setAddon, storiesOf } from "@storybook/react";
import { action, configureActions } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withInfo } from "@storybook/addon-info";
import JSXAddon from "storybook-addon-jsx";
import { withState } from "@dump247/storybook-state";

// https://github.com/storybooks/storybook/tree/release/3.4/addons/knobs
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs/react";

setAddon(JSXAddon);

export default function createStory(name, m) {
  var y = storiesOf(name, m);
  y.addDecorator(withKnobs);
  return {
    add: y.addWithJSX,
    addDecorator: y.addDecorator
  };
}
