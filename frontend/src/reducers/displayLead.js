import types from "../actions/types"

const initialState = {
  private_fields: null,
  public_fields: null,
}

const contact_info_fields = ["", "", ""]

const seperateLead = lead => {
  let p = {}
  contact_info_fields.forEach(f => {
    p[f] = lead[f]
    delete lead[f]
  })
  return [p, lead]
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
