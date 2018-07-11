import React from "react"
import { storiesOf } from "@storybook/react"
import { completeRegistration, app } from "Actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import snackbar from "Sagas/snackbar"

storiesOf("Containers/Complete registration", module)
  .add("All chapters", () => {
    let { store, story } = createStoreAndStory({
      path: "/complete-registration",
      sagaFunction: snackbar,
    })

    const change = (key, value, t) =>
      new Promise(resolve => {
        setTimeout(() => {
          key === "phone" ? (value = { value }) : null
          store.dispatch(
            completeRegistration.completeRegistrationHandleChange(key, value),
          )
          resolve()
        }, t)
      })

    let flow = [
      {
        key: "company",
        values: "Leadcoin",
      },
      { key: "country", values: "Israel" },
      {
        key: "phone",
        values: "+9720584709090",
      },
    ]

    async function go() {
      for (let i = 0; i < flow.length; i++) {
        await change(flow[i].key, "", 400)

        for (let j = 0; j <= flow[i].values.length; j++) {
          await change(flow[i].key, flow[i].values.substr(0, j), 90)
        }
      }
      await change("", "", 400)
      store.dispatch(completeRegistration.completeRegistrationLoading())
      await change("", "", 900)
      store.dispatch(
        completeRegistration.completeRegistrationError("Country not allowed"),
      )
      await change("country", "", 2000)
      await change("country", "U", 200)
      await change("country", "US", 200)
      await change("country", "USA", 200)
      await change("", "", 800)
      store.dispatch(completeRegistration.completeRegistrationLoading())
      await change("", "", 900)
      store.dispatch(app.notificationShow("Success!", "success"))
      store.dispatch(completeRegistration.completeRegistrationFinish())
    }

    go()

    return story
  })
  .add("empty", () => {
    let { store, story } = createStoreAndStory({
      path: "/complete-registration",
    })
    return story
  })
  .add("loading state", () => {
    let { store, story } = createStoreAndStory({
      path: "/complete-registration",
    })
    store.dispatch(completeRegistration.completeRegistrationLoading())
    return story
  })
  .add("loading state after 500 ms", () => {
    let { store, story } = createStoreAndStory({
      path: "/complete-registration",
    })
    setTimeout(function() {
      store.dispatch(completeRegistration.completeRegistrationLoading())
    }, 500)
    return story
  })
  .add("error form", () => {
    let { store, story } = createStoreAndStory({
      path: "/complete-registration",
    })
    store.dispatch(
      completeRegistration.completeRegistrationError(
        "this is an example error; this is 2nd error",
      ),
    )
    return story
  })
