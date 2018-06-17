import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import EmailConfirmation from "../EmailConfirmation"

storiesOf("Containers/Email Confirmations")
  .add("Empty", () => {
    let {store, story} = createStoreAndStory({
      component: EmailConfirmation,
    })
    return story
  })
  .add("Already Confirmed", () => {
    let { store, story } = createStoreAndStory({
      component: EmailConfirmation,
    })
    store.dispatch(actions.emailConfirmation.emailConfirmationConfirmed())
    return story
  })

  .add("Resend", () => {
    let {store, story} = createStoreAndStory({
      component: EmailConfirmation,
    })
    store.dispatch(actions.emailConfirmation.emailConfirmationResend())
    return story
  })

  .add("sent success", () => {
    let {store, story} = createStoreAndStory({
      component: EmailConfirmation,
    })
    store.dispatch(actions.emailConfirmation.emailConfirmationSent())
    return story
  })
  .add("sent error", () => {
    let {store, story} = createStoreAndStory({
      component: EmailConfirmation,
    })
    store.dispatch(actions.emailConfirmation.emailConfirmationError([]))
    return story

  })
