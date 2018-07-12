import React from "react"
import { storiesOf } from "@storybook/react"
import { types, user } from "Actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { take } from "redux-saga/effects"
import { toast } from "react-toastify"

const storySaga = type => {
  return function*() {
    while (true) {
      yield take(types.EMAIL_CONFIRMATION_RESEND)

      setTimeout(
        () =>
          toast[type](
            type === "success"
              ? "We sent a verification email. Please follow the instructions in it."
              : "Error",
          ),
        500,
      )
    }
  }
}

storiesOf("Containers/Email Confirmations", module)
  .add("Resend success", () => {
    let { store, story } = createStoreAndStory({
      path: "/email-confirmation",
      sagaFunction: storySaga("success"),
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
  .add("Resend error", () => {
    let { store, story } = createStoreAndStory({
      path: "/email-confirmation",
      sagaFunction: storySaga("error"),
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
