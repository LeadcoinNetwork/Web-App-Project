import React from "react"
import { storiesOf } from "@storybook/react"
import { completeRegistration, app } from "Actions"
import { createStoreAndStory } from "storybook-utils/withRouter"
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
          store.dispatch(
            completeRegistration.completeRegistrationHandleChange(key, value),
          )
          resolve()
        }, t)
      })

    let flow = [
      {
        key: "company",
        values: [
          "L",
          "Le",
          "Lea",
          "Lead",
          "Leadc",
          "Leadco",
          "Leadcoi",
          "Leadcoin",
        ],
      },
      { key: "country", values: ["I", "Is", "Isr", "Isra", "Israe", "Israel"] },
      {
        key: "phone",
        values: [
          { value: "+" },
          { value: "+9" },
          { value: "+97" },
          { value: "+972" },
          { value: "+972" },
          { value: "+97205" },
          { value: "+972058" },
          { value: "+9720584" },
          { value: "+97205847" },
          { value: "+972058470" },
          { value: "+9720584709" },
          { value: "+97205847090" },
          { value: "+972058470909" },
          { value: "+9720584709090" },
        ],
      },
    ]

    async function go() {
      for (let i = 0; i < flow.length; i++) {
        await change(flow[i].key, "", 400)

        for (let j = 0; j < flow[i].values.length; j++) {
          await change(flow[i].key, flow[i].values[j], 90)
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
