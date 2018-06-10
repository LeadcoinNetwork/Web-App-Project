import React from "react"
import { storiesOf } from "@storybook/react"
import { withInfo } from "@storybook/addon-info"

storiesOf("Example Stories/Info", module).add(
  "Info",
  withInfo("This is the info")(() => <div>Hello World</div>),
)
