import React from "react"
import { storiesOf } from "@storybook/react"
import Textarea from "./Textarea"

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

class TextareaState extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: props.value || "" }
  }
  render() {
    return (
      <Textarea
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={e => {
          this.setState({ value: e.target.value })
        }}
      />
    )
  }
}

storiesOf("Components/Textarea",module)
  .add("add text", () => <TextareaState placeholder="Type here..." />)
  .add("with text", () => (
    <TextareaState placeholder="Lorem ipsum" value={lorem} />
  ))
