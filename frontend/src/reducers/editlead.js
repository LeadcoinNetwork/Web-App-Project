import { types } from "../actions"
import fields from "./fields-data"

const lead_fields = [
  "Contact Person",
  "Telephone",
  "Email",
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

const initialState = {
  original_copy: null,
  fields: {
    private: fields
      .filter(field => field.private)
      .map(field => {
        return {
          key: field.key,
          name: field.name,
          type: field.type,
          options: field.options,
        }
      })
      .filter(field => lead_fields.includes(field.key)),
    public: fields
      .filter(field => !field.private)
      .map(field => {
        return {
          key: field.key,
          name: field.name,
          type: field.type,
          options: field.options,
        }
      })
      .filter(field => lead_fields.includes(field.key)),
  },
  errors: {},
  agree_to_terms: false,
  loading: false,
  values: {},
}

const filterFields = lead => {
  let obj = {}
  lead_fields.forEach(f => {
    if (lead[f]) {
      obj[f] = lead[f]
    }
  })
  return obj
}

let newErrors = null
export default function(state = initialState, action) {
  switch (action.type) {
    case types.EDIT_LEAD_EDIT_LEAD:
      const filteredFields = filterFields(action.lead)
      return {
        ...state,
        original_copy: action.lead,
        values: filteredFields,
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

      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        },
        errors: newErrors,
      }

    default:
      return state
  }
}
