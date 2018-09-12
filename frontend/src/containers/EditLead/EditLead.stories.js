import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/EditLead", module)
  .add("EditLead - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/edit-lead",
      loggedIn: true,
    })
    return story
  })
  .add("EditLead - with fields", () => {
    var { store, story } = createStoreAndStory({
      path: "/edit-lead",
      loggedIn: true,
    })
    return story
  })
  .add("EditLead - Connect to real saga", () => {
    var { store, story } = createStoreAndStory({
      path: "/edit-lead",
      // sagaFunction:AddLeadSaga()
      connectToProductionSaga: true,
    })
    return story
  })
  .add("EditLead - after submit", () => {
    var { store, story } = createStoreAndStory({
      path: "/edit-lead",
      loggedIn: true,
    })
    store.dispatch(actions.addLead.addLeadLoadingStart())
    return story
  })
  .add("EditLead - with erros", () => {
    var { store, story } = createStoreAndStory({
      path: "/edit-lead",
      loggedIn: true,
    })
    store.dispatch(actions.editLead.editLeadAddError("size", "too short"))
    store.dispatch(actions.editLead.editLeadAdError("phone", "is not valid"))
    return story
  })
