import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/withRouter"
import { user } from "Actions"

storiesOf("Containers/SideMenu", module).add("first", () => {
  let { store, story } = createStoreAndStory({ path: "/sell-leads" })

  store.dispatch(user.loggedIn({ id: 1 }))

  return story
})
