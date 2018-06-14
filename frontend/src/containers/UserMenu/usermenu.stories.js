import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/withRouter"

import { specs, describe, it } from "storybook-addon-specifications"
import { mount } from "enzyme"
import expect from "expect"

import UserMenu from "./UserMenu"

storiesOf("Containers/User Menu")
  .add("closed", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })
    return story
  })
  .add("opened", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })

    return story
  })

  .add("should dispatch a function on click", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })

    specs(() =>
      describe("should dispatch a function on click", function() {
        it("check that getState().usermenu.open is true after click", function(done) {
          let output = mount(story)
          var executed = false
          store.subscribe(function(a, b, c) {
            if (store.getState().usermenu.open) done()
            else {
              done(new Error("state did not changed"))
            }
            executed = true
          })
          store.dispatch({ type: "asdsa" })
          output.simulate("click")
          if (!executed) done(new Error("action did not executed"))
        })
      }),
    )

    return story
  })
