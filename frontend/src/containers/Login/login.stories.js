import React from "react"
import { storiesOf } from "@storybook/react"
import { login } from "Actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/Login", module)
  .add("empty form", () => {
    var { store, story } = createStoreAndStory({ path: "/login" })
    return story
  })

  .add("loading state", () => {
    var { store, story } = createStoreAndStory({ path: "/login" })
    store.dispatch(login.loginLoading())
    return story
  })

  .add("error form", () => {
    var { store, story } = createStoreAndStory({ path: "/login" })
    store.dispatch(
      login.loginError("this is an example error; this is 2nd error"),
    )
    return story
  })
