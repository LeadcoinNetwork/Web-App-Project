import { types } from "../actions"
import fields from "./fields-data"

const initialState = {
  original_copy: null,
  private_fields: {},
  public_fields: {},
  errors: {},
  agree_to_terms: false,
  loading: false,
  values: {},
}

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

let newErrors = null
export default function(state = initialState, action) {
  switch (action.type) {
    case types.EDIT_LEAD_EDIT_LEAD:
      const [private_fields, public_fields] = seperateLead(action.lead)
      return {
        ...state,
        private_fields,
        public_fields,
        original_copy: action.lead,
      }

    case types.EDIT_LEAD_FORM_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.error.name]: action.error.value,
        },
      }

    case types.EDIT_LEAD_AGREE_TO_TERMS:
      newErrors = { ...state.errors }
      delete newErrors["agree_to_terms"]
      return {
        ...state,
        errors: newErrors,
        agree_to_terms: action.agree_to_terms.value,
      }

    case types.EDIT_LEAD_LOADING_START:
      return {
        ...state,
        loading: true,
      }

    case types.EDIT_LEAD_LOADING_END:
      return {
        ...state,
        loading: false,
      }

    case types.EDIT_LEAD_CLEAR_FORM:
      return initialState

    case types.EDIT_LEAD_HANDLE_FORM_CHANGE:
      newErrors = { ...state.errors }
      delete newErrors[action.payload.name]
      if (contact_info_fields.includes(action.payload.name)) {
        state.private_fields[action.payload.name] = action.payload.value
      } else {
        state.public_fields[action.payload.name] = action.payload.value
      }
      return { ...state, errors: newErrors }

    default:
      return state
  }
}
