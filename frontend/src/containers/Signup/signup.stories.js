import "./Signup.scss"
import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { routerMiddleware, go, push } from "react-router-redux"
import { select, take, put, call } from "redux-saga/effects"

storiesOf("Containers/SignUp", module)
  .add("empty form", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    return story
  })

  .add("loading state", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    store.dispatch(actions.signup.signupLoading())
    return story
  })

  .add("loading state after 500 ms", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    setTimeout(function() {
      store.dispatch(actions.signup.signupLoading())
    }, 500)
    return story
  })

  .add("show user is duplicated after 100 ms", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    setTimeout(function() {
      store.dispatch(actions.signup.signupError("user is duplicated"))
    }, 500)
    return story
  })

  .add("error form", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    store.dispatch(
      actions.signup.signupError("this is an example error; this is 2nd error"),
    )
    return story
  })
