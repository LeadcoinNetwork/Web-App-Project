import types from "../actions/types"

const initialState = {
  private_fields: null,
  public_fields: null,
}

/**
 "industry": "Website Building",
 "email": "luho@sokga.bh",
 "pages": 5,
 "content_updates": "Mostly Static",
 "date": 1550762925487,
 "functionality": [
 "Corporate"
 ],
 "mobile_design": "Yes",
 "seo": "No",
 "content_management": "No",
 "e_commerce": "Yes",
 "blog": "Yes",
 "budget": 99,
 "languages": [
 "Hebrew",
 "Russian",
 "Irish",
 "Italian",
 "Polish"
 ],
 "hosting": "Yes",
 "comments": "Voemfez arinep.",
 "bought_from": null,
 "forSale": true,
 "lead_price": 10,
 "ownerId": 20,
 "contact_person": "Christian Padilla",
 "telephone": "(316) 822-6386",
 "active": true,
 "price": 42959
 */

const contact_info_fields = ["Contact Person", "Telephone", "Email"]
const lead_fields = [
  "Number of pages",
  "Content Updates",
  "Functionality",
  "Mobile Design",
  "SEO",
  "Content Management",
  "E-commerce",
  "Blog",
  "Budget",
  "Language",
  "Hosting",
  "Comments",
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
