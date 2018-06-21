import React from "react"
import { storiesOf } from "@storybook/react"
import { completeRegistration } from "Actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Complete registration", module)
  .add("empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/complete-registration",
    })
    return story
  })
  .add("loading state", () => {
    var { store, story } = createStoreAndStory({
      path: "/complete-registration",
    })
    store.dispatch(completeRegistration.completeRegistrationLoading())
    return story
  })

  .add("loading state after 500 ms", () => {
    var { store, story } = createStoreAndStory({
      path: "/complete-registration",
    })
    setTimeout(function() {
      store.dispatch(completeRegistration.completeRegistrationLoading())
    }, 500)
    return story
  })

  .add("show user is duplicated after 100 ms", () => {
    var { store, story } = createStoreAndStory({
      path: "/complete-registration",
    })
    setTimeout(function() {
      store.dispatch(
        completeRegistration.completeRegistrationError("user is duplicated"),
      )
    }, 500)
    return story
  })

  .add("error form", () => {
    var { store, story } = createStoreAndStory({
      path: "/complete-registration",
    })
    store.dispatch(
      completeRegistration.completeRegistrationError(
        "this is an example error; this is 2nd error",
      ),
    )
    return story
  })
