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
      yield take(types.SELL_LEADS_FETCH_LEADS)
      yield delay(600)

      if (leadsMock.length * leadsPage >= leadsTotal) {
        yield put(
          leads.fetchSuccess("SELL_LEADS", {
            list: [],
          }),
        )
      } else {
        leadsPage++
        yield put(
          leads.fetchSuccess("SELL_LEADS", {
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

storiesOf("Containers/Sell Leads", module)
  .add("Sell Leads - empty", () => {
    let { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
    })
    return story
  })
  .add("Sell Leads - loading", () => {
    let { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
    })
    store.dispatch(leads.fetchLeads("SELL_LEADS"))
    return story
  })
  .add("Sell Leads - with mock fields", () => {
    let { store, story } = createStoreAndStory({
      path: "/sell-leads",
      loggedIn: true,
      sagaFunction: storySaga(),
    })

    store.dispatch(
      leads.fetchSuccess("SELL_LEADS", {
        list: leadsMock,
        page: leadsPage,
        limit: 200,
        total: leadsTotal,
      }),
    )
    return story
  })
