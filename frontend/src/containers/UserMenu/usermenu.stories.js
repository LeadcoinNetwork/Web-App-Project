import React from "react"
import { storiesOf } from "@storybook/react"
import { userMenu, types } from "Actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"

import { specs, describe, it } from "storybook-addon-specifications"
import { mount } from "enzyme"
import UserMenu from "./UserMenu"

storiesOf("Containers/User Menu", module)
  .add("closed", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    return story
  })
  .add("opened", () => {
    var { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    store.dispatch(userMenu.userMenuOpen())
    return story
  })

  .add("should change state getState().usermenu.open onClick", () => {
    var { store, story } = createStoreAndStory({
      component: UserMenu,
    })

    specs(() =>
      describe("", function() {
        it("check that USER_MENU_OPEN action has dispatched", done => {
          // We test the container, and the actionCreator.
          let output = mount(story)
          var ok = 0
          // store.replaceReducer((state, action) => {
          //   if (action.type == types.USER_MENU_OPEN) {
          //     ok = true
          //   }
          // })
          output.find(".click-handler").simulate("click")
          if (store.getState().user.menu.open) {
            done()
          } else {
            done(new Error("state did not changed"))
          }
        })
        it("check that USER_MENU_OPEN action has ", done => {
          // We test the container, and the actionCreator.
          let output = mount(story)
          var ok = 0
          output.find(".click-handler").simulate("click")
          if (store.getState().user.menu.open) {
            done()
          } else {
            done(new Error("state did not changed"))
          }
        })
      }),
    )

    return story
  })
