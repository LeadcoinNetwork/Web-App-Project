
import { types } from "../actions"

const initialState = {
  db_fields: [],
  errors: {},
  agree_to_terms: false,
  values: {},
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_LEAD_FORM_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.error.name]: action.error.value
        },
      }

    case types.ADD_LEAD_AGREE_TO_TERMS:
      return {
        ...state,
        errors: [],
        agree_to_terms: action.agree_to_terms.value
      }

    case types.ADD_LEAD_TOGGLE_LOADING:
      return {
        ...state,
        loading: action.loading,
      }

    case types.ADD_LEAD_CLEAR_FORM:
      return {
        ...state,
        agree_to_terms: initialState.agree_to_terms,
      }

    case types.ADD_LEAD_HANDLE_FORM_CHANGE:
      return {
        ...state,
        errors: [],
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        }
      }

    case types.ADD_LEAD_GET_DB_FIELDS:
      return {
        ...state,
        db_fields: action.db_fields,
      }
    default:
      return state
    }
  }