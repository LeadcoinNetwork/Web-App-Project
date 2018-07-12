import React from "react"
import { storiesOf } from "@storybook/react"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import { types, leads } from "Actions"
import { delay } from "redux-saga"
import { take, put } from "redux-saga/effects"

let leadsMock = require("../../mocks/leads.json"),
  leadsPage = 0,
  leadsTotal = leadsMock.length * 10

const storySaga = () => {
  return function*() {
    while (true) {
      yield take(types.BUY_LEADS_FETCH_LEADS)
      yield delay(600)

      if (leadsMock.length * leadsPage >= leadsTotal) {
        yield put(
          leads.fetchSuccess("BUY_LEADS", {
            list: [],
          }),
        )
      } else {
        leadsPage++
        yield put(
          leads.fetchSuccess("BUY_LEADS", {
            list: leadsMock.map(l => ({ ...l, id: l.id + "_" + leadsPage })),
            page: leadsPage,
            limit: 200,
            total: leadsTotal,
          }),
        )
      }
    }
  }
}

storiesOf("Containers/Buy Leads", module)
  .add("Buy Leads - empty", () => {
    let { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    return story
  })
  .add("Buy Leads - loading", () => {
    let { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
    })
    store.dispatch(leads.fetchLeads("BUY_LEADS"))
    return story
  })
  .add("Buy Leads - with mock fields", () => {
    let { store, story } = createStoreAndStory({
      path: "/buy-leads",
      loggedIn: true,
      sagaFunction: storySaga(),
    })

    store.dispatch(
      leads.fetchSuccess("BUY_LEADS", {
        list: leadsMock,
        page: leadsPage,
        limit: 200,
        total: leadsTotal,
      }),
    )
    return story
  })
