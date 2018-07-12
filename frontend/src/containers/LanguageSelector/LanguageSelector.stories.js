import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { language } from "Actions"

storiesOf("Containers/Language Selector", module)
  .add("Logged out", () => {
    var { store, story } = createStoreAndStory({
      path: "/login",
      loggedIn: false,
    })

    return story
  })
  .add("Logged out - USA", () => {
    var { store, story } = createStoreAndStory({
      path: "/login",
      loggedIn: false,
    })

    store.dispatch(language.languageSelectorUpdate("us"))
    return story
  })
  .add("Logged out - Japan", () => {
    var { store, story } = createStoreAndStory({
      path: "/login",
      loggedIn: false,
    })

    store.dispatch(language.languageSelectorUpdate("jp"))
    return story
  })
  .add("Logged out - Korea", () => {
    var { store, story } = createStoreAndStory({
      path: "/login",
      loggedIn: false,
    })

    store.dispatch(language.languageSelectorUpdate("kr"))
    return story
  })
  .add("Logged out - China", () => {
    var { store, story } = createStoreAndStory({
      path: "/login",
      loggedIn: false,
    })

    store.dispatch(language.languageSelectorUpdate("cn"))
    return story
  })
  .add("Logged in", () => {
    var { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
    })

    return story
  })
