import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

function* fakeSaga() {
  console.log("fake saga is running")
}

storiesOf("Containers/SignUp", module)
  .add("connected to production saga", () => {
    var { store, story } = createStoreAndStory({
      path: "/users/signup",
      connectToProductionSaga: true,
    })
    return story
  })

  .add("connected to fake saga", () => {
    var { store, story, saga } = createStoreAndStory({
      path: "/users/signup",
      sagaFunction: fakeSaga,
    })
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

  .add("loading state after 500 ms", () => {
    var { store, story } = createStoreAndStory({ path: "/users/signup" })
    setTimeout(function() {
      store.dispatch(actions.signup.SIGNUP_LOADING())
    }, 500)
    return story
  })

  .add("show user is duplicated after 100 ms", () => {
    var { store, story } = createStoreAndStory({ path: "/users/signup" })
    setTimeout(function() {
      store.dispatch(actions.signup.SIGNUP_FORM_ERROR("user is duplicated"))
    }, 500)
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
