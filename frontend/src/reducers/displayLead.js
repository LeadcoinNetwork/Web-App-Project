import { types } from "../actions"
import fields from "./fields-data"

/**
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
      "Bedrooms/Baths": "",
      Type: "Rent",
      Price: "10,500",
      Size: "127",
      State: "Ohio",
      Location: "Akron",
      "Housing Type": "apartment",
 */
const initialIndustry = window.localStorage.getItem("industry")

const fields_not_for_display = ["active", "Industry"]
let contact_info_fields = []
let lead_fields = []

const setFields = industry => {
  contact_info_fields = fields[industry]
    ? fields[industry].private
        .filter(field => field.editable)
        .map(field => ({ key: field.key, name: field.name }))
        .filter(f => !fields_not_for_display.includes(f.key))
    : []
  lead_fields = fields[industry]
    ? fields[industry].public
        .filter(field => field.editable)
        .map(field => ({ key: field.key, name: field.name }))
        .filter(f => !fields_not_for_display.includes(f.key))
    : []
}
setFields(initialIndustry)

const initialState = {
  private_fields: null,
  public_fields: null,
}

const seperateLead = lead => {
  let priv = {},
    pub = {}
  contact_info_fields.forEach(f => {
    if (lead[f.key]) {
      priv[f.key] = lead[f.key]
    }
  })
  lead_fields.forEach(f => {
    if (lead[f.key]) {
      pub[f.key] = lead[f.key]
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
    case types.INDUSTRY_UPDATE:
      setFields(action.payload)
      return {
        ...state,
      }
    default:
      return state
  }
}

export default displayLead
