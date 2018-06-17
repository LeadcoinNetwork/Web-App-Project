import "./Signup.scss"
import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
import { routerMiddleware, go, push } from "react-router-redux"
import { select, take, put, call } from "redux-saga/effects"

function* fakeSaga() {
  // yield put(push("/email-confirmation"))
}

storiesOf("Containers/SignUp", module)
  .add("connected to production saga", () => {
    var { store, story } = createStoreAndStory({
      path: "/signup",
      connectToProductionSaga: true,
    })
    return story
  })

  .add("connected to fake saga", () => {
    var { store, story, saga } = createStoreAndStory({
      path: "/signup",
      sagaFunction: fakeSaga,
    })
    setTimeout(function() {
      console.log("here!")
      store.dispatch(push("/email-confirmation"))
    }, 1500)
    return story
  })

  .add("empty form", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    return story
  })

  .add("loading state", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    store.dispatch(actions.signup.SIGNUP_LOADING())
    return story
  })

  .add("loading state after 500 ms", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    setTimeout(function() {
      store.dispatch(actions.signup.SIGNUP_LOADING())
    }, 500)
    return story
  })

  .add("show user is duplicated after 100 ms", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    setTimeout(function() {
      store.dispatch(actions.signup.SIGNUP_FORM_ERROR("user is duplicated"))
    }, 500)
    return story
  })

  .add("error form", () => {
    var { store, story } = createStoreAndStory({ path: "/signup" })
    store.dispatch(
      actions.signup.SIGNUP_FORM_ERROR(
        "this is an example error; this is 2nd error",
      ),
    )
    return story
  })
