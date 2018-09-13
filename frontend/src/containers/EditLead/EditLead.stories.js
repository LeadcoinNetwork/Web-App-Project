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
      path: "/edit-lead/134917",
      loggedIn: true,
    })
    const mock_lead = {
      id: 134917,
      lead_price: 10,
      ownerId: 8434,
      date: 1534322606144,
      lead_type: "realestate",
      active: true,
      forSale: true,
      bought_from: 0,
      "Contact Person": "Erez",
      Telephone: "(225)65734",
      Email: "whatisthisemail@gmail.com",
      Description: "Beautiful Cattle and Horse Country Farm Approx 125 Acres",
      "Bedrooms/Baths": "2BD / 2BR",
      Type: "Rent",
      Price: "10,500",
      Size: "127",
      State: "Ohio",
      Location: "Akron",
      "Housing Type": "apartment",
    }

    store.dispatch(actions.editLead.editLead(mock_lead))

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
