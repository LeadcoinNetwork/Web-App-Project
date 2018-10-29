import React from "react"
import { storiesOf } from "@storybook/react"
import * as actions from "actions"
import { createStoreAndStory } from "storybook-utils/createStoreAndStory"
import displayLead from "../../actions/displayLead"

storiesOf("Containers/DisplayLead", module)
  .add("DisplayLead - empty", () => {
    var { store, story } = createStoreAndStory({
      path: "/display-lead",
      loggedIn: true,
    })
    return story
  })
  .add("DisplayLead - with data", () => {
    var { store, story } = createStoreAndStory({
      path: "/display-lead",
      loggedIn: true,
    })
    const mock_lead = {
      id: 134917,
      lead_price: 10,
      ownerId: 8434,
      date: 1534322606144,
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

    store.dispatch(displayLead.displayLeadGet(mock_lead))
    return story
  })
