import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { types, leads } from "Actions"
import { delay } from "redux-saga"
import { take, put } from "redux-saga/effects"

let leadsMock = require("../../mocks/leads.json"),
  leadsPage = 0,
  leadsTotal = leadsMock.length * 10

storiesOf("Containers/Joyride", module).add("story 1", () => {
  let { store, story } = createStoreAndStory({
    path: "/buy-leads",
    loggedIn: true,
  })
  return story
})
