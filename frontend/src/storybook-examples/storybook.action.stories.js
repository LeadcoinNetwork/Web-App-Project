import React from "react"
import { storiesOf } from "@storybook/react"
import { action, configureActions } from "@storybook/addon-actions"

storiesOf("Example Stories/action", module).add("action", () => (
  <div onClick={action("clicked")}>Click Here to see an example action</div>
))
