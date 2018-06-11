import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import UserSettings from "./UserSettings"
import { action } from "@storybook/addon-actions"
import { withState } from "@dump247/storybook-state"

function createStoryInDesignDecoration(nameOfStory) {
  return storiesOf(nameOfStory, module).addDecorator(getStories => (
    <MuiThemeProvider children={getStories()} />
  ))
}

createStoryInDesignDecoration("User Settings")
  .add("Change Password", () => (
    <UserSettings onSubmit={action("Submit Password")} />
  ))
  .add("Example Password", () => (
    <UserSettings current="123" onSubmit={action("Submit Password")} />
  ))

  .add(
    "Example Password with state",
    withState({})(({ store }) => {
      return (
        <UserSettings
          current={store.state.current}
          newPassword={store.state.newPassword}
          confirmPassword="789"
          onSubmit={action("Submit Password")}
          onUpdate={(name, value) => {
            store.set({ [name]: value })
          }}
        />
      )
    }),
  )
