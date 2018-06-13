import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

function* mySaga() {}
storiesOf("App/SignUp", module)
  .add("connected to saga", () => {
    var { store, story, saga } = createStoreAndStory({ path: "/users/signup" })
    return story
  })

  .add("empty form", () => {
    var { store, story } = createStoreAndStory({ path: "/users/signup" })
    return story
  })

  .add("loading state", () => {
    var { store, story } = createStoreAndStory({ path: "/users/signup" })
    store.dispatch(actions.signup.SIGNUP_LOADING())
    return story
  })

  .add("error form", () => {
    var { store, story } = createStoreAndStory({ path: "/users/signup" })
    store.dispatch(
      actions.signup.SIGNUP_FORM_ERROR(
        "this is an example error; this is 2nd error",
      ),
    )
    return story
  })
