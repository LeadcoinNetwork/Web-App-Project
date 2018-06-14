import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Login", module)
  .add("empty form", () => {
    var { store, story } = createStoreAndStory({ path: "/users/login" })
    return story
  })

  .add("loading state", () => {
    var { store, story } = createStoreAndStory({ path: "/users/login" })
    store.dispatch(actions.login.loginLoading())
    return story
  })

  .add("error form", () => {
    var { store, story } = createStoreAndStory({ path: "/users/login" })
    store.dispatch(
      actions.login.loginFormError(
        "this is an example error; this is 2nd error",
      ),
    )
    return story
  })
