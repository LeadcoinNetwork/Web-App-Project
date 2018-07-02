import React from "react"
import { storiesOf } from "@storybook/react"
import { user, emailConfirmation } from "Actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

storiesOf("Containers/Email Confirmations", module).add("Page", () => {
  let { store, story } = createStoreAndStory({
    path: "/email-confirmation",
    loggedIn: true,
    connectToProductionSaga: true,
  })
  store.dispatch(
    user.loggedIn({
      id: 1,
      email: "meir@leadcoin.network",
      disabled: "EMAIL_NOT_VERIFIED",
    }),
  )
  return story
})

//
// .add("Already Confirmed", () => {
//   let { store, story } = createStoreAndStory({
//     path: "/email-confirmation",
//   })
//   store.dispatch(actions.emailConfirmation.emailConfirmationConfirmed())
//   return story
// })
//
// .add("Resend", () => {
//   let { store, story } = createStoreAndStory({
//     path: "/email-confirmation",
//   })
//   store.dispatch(actions.emailConfirmation.emailConfirmationResend())
//   return story
// })
//
// .add("sent success", () => {
//   let { store, story } = createStoreAndStory({
//     path: "/email-confirmation",
//   })
//   store.dispatch(actions.emailConfirmation.emailConfirmationSent())
//   return story
// })
// .add("sent error", () => {
//   let { store, story } = createStoreAndStory({
//     path: "/email-confirmation",
//   })
//   store.dispatch(actions.emailConfirmation.emailConfirmationError([]))
//   return story
// })
