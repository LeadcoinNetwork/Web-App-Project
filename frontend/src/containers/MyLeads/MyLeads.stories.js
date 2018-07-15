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
      yield take(types.MY_LEADS_FETCH_LEADS)
      yield delay(600)

      if (leadsMock.length * leadsPage >= leadsTotal) {
        yield put(
          leads.fetchSuccess("MY_LEADS", {
            list: [],
          }),
        )
      } else {
        leadsPage++
        yield put(
          leads.fetchSuccess("MY_LEADS", {
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

storiesOf("Containers/My Leads", module)
  .add("My Leads - empty", () => {
    let { store, story } = createStoreAndStory({
      path: "/my-leads",
      loggedIn: true,
    })
    return story
  })
  .add("My Leads - loading", () => {
    let { store, story } = createStoreAndStory({
      path: "/my-leads",
      loggedIn: true,
    })
    store.dispatch(leads.fetchLeads("MY_LEADS"))
    return story
  })
  .add("My Leads - with mock fields", () => {
    let { store, story } = createStoreAndStory({
      path: "/my-leads",
      loggedIn: true,
      sagaFunction: storySaga(),
    })

    store.dispatch(
      leads.fetchSuccess("MY_LEADS", {
        list: leadsMock,
        page: leadsPage,
        limit: 200,
        total: leadsTotal,
      }),
    )
    return story
  })
