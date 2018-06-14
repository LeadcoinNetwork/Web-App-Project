import React from "react"
import { storiesOf } from "@storybook/react"
import UserSettings from "./"
import { createStoreAndStory } from "storybook-utils/withRouter"
import { withState } from "@dump247/storybook-state"

storiesOf("Containers/User Settings")
  .add("Example Password", () => {
    var { store, story } = createStoreAndStory({
      component: UserSettings,
    })
    return story
  })
  .add(
    "Change Password with state",
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
    }),
  )
  .add(
    "Change Password with loading state",
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
    }),
  )
  .add(
    "Change Password with submit state",
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
          <button onClick={() => store.reset()}>RESET</button>
        </div>
      )
    }),
  )
  .add(
    "Error state",
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
          <button onClick={() => store.reset()}>RESET</button>
        </div>
      )
    }),
  )
