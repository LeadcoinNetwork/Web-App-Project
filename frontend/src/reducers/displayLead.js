import types from "../actions/types"

const initialState = {
  id: null,
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

const contact_info_fields = ["contact_person", "telephone", "email"]
const lead_fields = [
  "pages",
  "content_updates",
  "functionality",
  "mobile_design",
  "seo",
  "content_management",
  "e_commerce",
  "blog",
  "budget",
  "languages",
  "hosting",
  "comments",
]

const seperateLead = lead => {
  const fields = lead.fields
  let priv = {},
    pub = {}
  if (fields && fields.length) {
    fields.forEach(f => {
      if (contact_info_fields.includes(f.key)) {
        priv[f.name] = lead[f.key]
      } else if (lead_fields.includes(f.key)) {
        pub[f.name] = lead[f.key]
      }
    })
  }

  return [priv, pub]
}

const displayLead = (state = initialState, action) => {
  switch (action.type) {
    case types.DISPLAY_LEAD_GET:
      console.log(action.lead)
      const [private_fields, public_fields] = seperateLead(action.lead)
      return { ...state, private_fields, public_fields, id: action.lead.id }
    case types.DISPLAY_LEAD_CLEAR:
      return initialState
    default:
      return state
  }
}

export default displayLead
