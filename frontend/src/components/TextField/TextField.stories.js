import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import TextField from "./TextField"

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ))
}

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
        placeholder={this.props.placeholder}
      />
    )
  }
}

createStoryInDesignDecoration("UI/TextField")
  .add("add text", () => <TextFieldState label="Text Field" />)
  .add("add with hint", () => (
    <TextFieldState label="Hinted Text Field" placeholder="Hint!" />
  ))
