import React from "react"
import { storiesOf } from "@storybook/react"
import { linkTo } from "@storybook/addon-links"

storiesOf("Example Stories/link", module).add("link", () => (
  <div onClick={linkTo("Example Stories/action", "action")}>
    Click here to link to other story
  </div>
))
