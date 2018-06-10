import React from "react"
import { storiesOf } from "@storybook/react"
import { withState } from "@dump247/storybook-state"

storiesOf("Example Stories/State", module).add(
  "with state",
  withState({})(({ store }) => (
    <div
      onClick={() => {
        store.set({ clicked: !store.state.clicked })
      }}
    >
      Click to toggle - {store.state.clicked ? "off" : "on"}
    </div>
  )),
)
