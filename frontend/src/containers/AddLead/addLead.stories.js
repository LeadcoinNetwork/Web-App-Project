import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

storiesOf("Containers/AddLead", module)
  .add("AddLead - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/add-lead",
      loggedIn: true,
    })
    return story
  })
  .add("AddLead - with fields", () => {
    var { store, story } = createStoreAndStory({
      path: "/add-lead",
      loggedIn: true,
    })
    return story
  })
  .add("AddLead - Connect to real saga", () => {
    var { store, story } = createStoreAndStory({
      path: "/add-lead",
      // sagaFunction:AddLeadSaga()
      connectToProductionSaga: true,
    })
    return story
  })
  .add("AddLead - after submit", () => {
    var { store, story } = createStoreAndStory({
      path: "/add-lead",
      loggedIn: true,
    })
    store.dispatch(actions.addLead.addLeadLoadingStart())
    return story
  })
  .add("AddLead - with erros", () => {
    var { store, story } = createStoreAndStory({
      path: "/add-lead",
      loggedIn: true,
    })
    store.dispatch(actions.addLead.addLeadAddError("size", "too short"))
    store.dispatch(actions.addLead.addLeadAddError("phone", "is not valid"))
    return story
  })
