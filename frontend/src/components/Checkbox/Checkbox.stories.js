import React from "react"
import { storiesOf } from "@storybook/react"
import Checkbox from "./Checkbox"

class CheckboxState extends React.Component {
  constructor() {
    super()
    this.state = { checked: true }
  }
  render() {
    return (
      <Checkbox
        checked={this.state.checked}
        onClick={() => {
          this.setState({ checked: !this.state.checked })
        }}
      />
    )
  }
}
storiesOf("Components/Checkbox").add("check checkbox", () => <CheckboxState />)
