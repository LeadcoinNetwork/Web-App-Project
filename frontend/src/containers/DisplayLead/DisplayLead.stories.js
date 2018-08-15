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
      lead_type: "realestate",
      active: true,
      forSale: true,
      bought_from: 0,
      "Contact Person": "**********",
      Telephone: "(225)6******",
      Email: "*********@gmail.com",
      Description: "Beautiful Cattle and Horse Country Farm Approx 125 Acres",
      "Bedrooms/Baths": "",
      Type: "Rent",
      Price: "",
      Size: "",
      State: "Ohio",
      Location: "",
      "Housing Type": "apartment",
    }

    store.dispatch(displayLead.displayLeadGet(mock_lead))
    return story
  })
