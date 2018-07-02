import React from "react"
import { storiesOf } from "@storybook/react"
import TextField from "./TextField"

class TextFieldState extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }
  }
  render() {
    return (
      <TextField
        value={this.state.value}
        onChange={e => {
          this.setState({ value: e.target.value })
        }}
        label={this.props.label}
        appStyle={this.props.appStyle}
        placeholder={this.props.placeholder}
      />
    )
  }
}

storiesOf("Components/TextField",module)
  .add("add text", () => <TextFieldState label="Text Field" />)
  .add("add with hint", () => (
    <TextFieldState label="Hinted Text Field" placeholder="Hint!" />
  ))
  .add("App style", () => (
    <TextFieldState placeholder="Type here..." appStyle={true} />
  ))
