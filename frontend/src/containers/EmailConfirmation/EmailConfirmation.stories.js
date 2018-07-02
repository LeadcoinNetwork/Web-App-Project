import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Email Confirmations", module)
  .add("Empty", () => {
    let { store, story } = createStoreAndStory({
      path: "/email-confirmation",
      loggedIn: true,
    })
    return story
  })
  .add("Already Confirmed", () => {
    let { store, story } = createStoreAndStory({
      path: "/email-confirmation",
    })
    store.dispatch(actions.emailConfirmation.emailConfirmationConfirmed())
    return story
  })

  .add("Resend", () => {
    let { store, story } = createStoreAndStory({
      path: "/email-confirmation",
    })
    store.dispatch(actions.emailConfirmation.emailConfirmationResend())
    return story
  })

  .add("sent success", () => {
    let { store, story } = createStoreAndStory({
      path: "/email-confirmation",
    })
    store.dispatch(actions.emailConfirmation.emailConfirmationSent())
    return story
  })
  .add("sent error", () => {
    let { store, story } = createStoreAndStory({
      path: "/email-confirmation",
    })
    store.dispatch(actions.emailConfirmation.emailConfirmationError([]))
    return story
  })
