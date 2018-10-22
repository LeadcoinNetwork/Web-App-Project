import { types } from "../actions"

const initialState = {
  private_fields: null,
  public_fields: null,
}

/**
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
      "Bedrooms/Baths": "",
      Type: "Rent",
      Price: "10,500",
      Size: "127",
      State: "Ohio",
      Location: "Akron",
      "Housing Type": "apartment",
 */

const contact_info_fields = ["Contact Person", "Telephone", "Email"]
const lead_fields = [
  "Description",
  "Size",
  "Housing Type",
  "State",
  "Price",
  "Type",
  "Bedrooms/Baths",
  "Location",
]

const seperateLead = lead => {
  let priv = {},
    pub = {}
  contact_info_fields.forEach(f => {
    if (lead[f]) {
      priv[f] = lead[f]
    }
  })
  lead_fields.forEach(f => {
    if (lead[f]) {
      pub[f] = lead[f]
    }
  })
  return [priv, pub]
}

const displayLead = (state = initialState, action) => {
  switch (action.type) {
    case types.DISPLAY_LEAD_GET:
      const [private_fields, public_fields] = seperateLead(action.lead)
      return { ...state, private_fields, public_fields }
    case types.DISPLAY_LEAD_CLEAR:
      return initialState
    default:
      return state
  }
}

export default displayLead
