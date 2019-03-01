import { types } from "../actions"
import fields from "./fields-data"
import { filterFields } from "../utils/prepare-data"

const fields_not_for_display = ["Industry"]

const initialState = {
  original_copy: null,
  fields: {
    private: fields
      .filter(field => field.private)
      .filter(field => field.editable)
      .map(field => {
        return {
          key: field.key,
          name: field.name,
          type: field.type,
          options: field.options,
          tooltip: field.tooltip,
        }
      }),
    public: fields
      .filter(field => !field.private)
      .filter(field => field.editable)
      .map(field => {
        return {
          key: field.key,
          name: field.name,
          type: field.type,
          options: field.options,
          tooltip: field.tooltip,
        }
      })
      .filter(f => !fields_not_for_display.includes(f.name)),
  },
  errors: {},
  agree_to_terms: false,
  loading: false,
  values: {},
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

    case types.EDIT_LEAD_HANDLE_SELECT_CHANGE:
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

    case types.EDIT_LEAD_HANDLE_MULTI_SELECT_CHANGE:
      newErrors = { ...state.errors }
      delete newErrors[action.payload.name]
      const payload = action.payload

      return {
        ...state,
        values: {
          ...state.values,
          [payload.value.type]: [
            ...state.values[payload.value.type],
            payload.value,
          ],
        },
        errors: newErrors,
      }

    case types.EDIT_LEAD_HANDLE_MULTI_SELECT_DELETE_VALUE:
      newErrors = { ...state.errors }
      delete newErrors[action.payload.name]

      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.value.type]: state.values[
            action.payload.value.type
          ].filter(value => value.label !== action.payload.value.label),
        },
        errors: newErrors,
      }

    default:
      return state
  }
}
