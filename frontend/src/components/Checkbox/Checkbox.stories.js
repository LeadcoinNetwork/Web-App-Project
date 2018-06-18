import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import Checkbox from "./Checkbox"
import { action, configureActions } from "@storybook/addon-actions"

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ))
}

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
createStoryInDesignDecoration("Components/Checkbox").add(
  "check checkbox",
  () => <CheckboxState />,
)

createStoryInDesignDecoration("Components/Checkbox").add(
  "checkbox with label",
  () => <CheckboxState label={"With Label"} />,
)

createStoryInDesignDecoration("Components/Checkbox").add(
  "checkbox with onclick",
  () => <Checkbox onClick={action("onClick")} />,
)
