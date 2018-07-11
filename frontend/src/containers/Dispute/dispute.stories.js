import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { dispute } from "Actions"

storiesOf("Containers/Dispute", module)
  .add("Dispute - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/dispute",
      loggedIn: true,
    })
    return story
  })
  .add("Dispute - with text", () => {
    var { store, story } = createStoreAndStory({
      path: "/dispute",
      loggedIn: true,
    })
    store.dispatch(dispute.disputeHandleChange("message", "Fake lead!"))
    return story
  })
  .add("Dispute - loading", () => {
    var { store, story } = createStoreAndStory({
      path: "/dispute",
      loggedIn: true,
    })
    store.dispatch(dispute.disputeLoading())
    return story
  })
  .add("Dispute - error", () => {
    var { store, story } = createStoreAndStory({
      path: "/dispute",
      loggedIn: true,
    })
    store.dispatch(dispute.disputeError("Error"))
    return story
  })
