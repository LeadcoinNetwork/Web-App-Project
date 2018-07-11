import React from "react"
import { storiesOf } from "@storybook/react"
import { types, user, forgotPassword } from "Actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { take, put } from "redux-saga/effects"
import { delay } from "redux-saga"
import { toast } from "react-toastify"

const storySaga = type => {
  return function*() {
    while (true) {
      yield take(types.FORGOT_PASSWORD_SUBMIT)
      yield put(forgotPassword.forgotPassswordLoading())
      yield delay(800)
      yield put(forgotPassword.forgotPassswordFinish())
      toast[type](
        type === "success"
          ? "We have emailed your password reset link."
          : "Error",
      )
    }
  }
}

storiesOf("Containers/Forgot Password", module)
  .add("Empty with success", () => {
    let { store, story } = createStoreAndStory({
      path: "/forgot-password",
      sagaFunction: storySaga("success"),
    })
    return story
  })
  .add("Empty with error", () => {
    let { store, story } = createStoreAndStory({
      path: "/forgot-password",
      sagaFunction: storySaga("error"),
    })
    return story
  })
