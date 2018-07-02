import React from "react"
import { storiesOf } from "@storybook/react"
import Checkbox from "./Checkbox"
import { action, configureActions } from "@storybook/addon-actions"

class CheckboxState extends React.Component {
  constructor() {
    super()
    this.state = { checked: true }
  }
  render() {
    return (
      <Checkbox
        {...this.props}
        checked={this.state.checked}
        onClick={() => {
          this.setState({ checked: !this.state.checked })
        }}
      />
    )
  }
}
storiesOf("Components/Checkbox",module).add("check checkbox", () => <CheckboxState />)

.add("checkbox with label", () => (
  <CheckboxState label={"With Label"} />
))

.add("checkbox with onclick", () => (
  <Checkbox onClick={action("onClick")} />
))
