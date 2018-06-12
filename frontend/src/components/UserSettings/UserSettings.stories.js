import React from "react"
import { storiesOf } from "@storybook/react"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import UserSettings from "./"
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
    <UserSettings currentPassword="123" onSubmit={action("Submit Password")} />
  ))
  .add("Change Password with state",
    withState({})(({ store }) => {
      return (
        <UserSettings
          currentPassword={store.state.currentPassword}
          newPassword={store.state.newPassword}
          confirmPassword={store.state.confirmPassword}
          onSubmit={action("Submit Password")}
          onUpdate={(name, value) => {
            store.set({ [name]: value })
          }}
          loading={false}
        />
      )
    })
  )
  .add("Change Password with loading state",
    withState({ loading: true })(({ store }) => {
      return (
        <UserSettings
          currentPassword={store.state.currentPassword}
          newPassword={store.state.newPassword}
          confirmPassword={store.state.confirmPassword}
          onSubmit={action("Submit Password")}
          onUpdate={(name, value) => {
            store.set({ [name]: value })
          }}
          loading={store.state.loading}
        />
      )
    })
  )
  .add("Change Password with submit state",
    withState({ loading: false })(({ store }) => {
      return (
        <div>
          <UserSettings
            currentPassword={store.state.currentPassword}
            newPassword={store.state.newPassword}
            confirmPassword={store.state.confirmPassword}
            onSubmit={() => {
              store.set({ loading: true })
              action("Submit Password")
            }}
            onUpdate={(name, value) => {
              store.set({ [name]: value })
            }}
            loading={store.state.loading}
          />
          <button onClick={
            () => store.reset()
          }>
          RESET
          </button>
        </div>
      )
    })
  )
