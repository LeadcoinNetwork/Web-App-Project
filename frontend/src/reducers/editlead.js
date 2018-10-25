import { types } from "../actions"
import fields from "./fields-data"

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
  original_copy: null,
  private_fields: {},
  public_fields: {},
  errors: {},
  agree_to_terms: false,
  loading: false,
  values: {},
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
      let isPrivate = false
      for (let i = 0; i < contact_info_fields.length; i++) {
        if (contact_info_fields[i].key === action.payload.name) {
          isPrivate = true
          break
        }
      }
      if (isPrivate) {
        state.private_fields[action.payload.name] = action.payload.value
      } else {
        state.public_fields[action.payload.name] = action.payload.value
      }
      return { ...state, errors: newErrors }
    case types.INDUSTRY_UPDATE:
      setFields(action.payload)
      return {
        ...state,
      }
    default:
      return state
  }
}
