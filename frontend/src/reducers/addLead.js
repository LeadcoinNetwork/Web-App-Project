
import { types } from "../actions"

const initialState = {
  db_fields: [],
  errors: [],
  price: "",
  agree_to_terms: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_LEAD_ERROR:
      return {
        ...state,
        errors: action.errors,
      }

    case types.ADD_LEAD_AGREE_TO_TERMS:
      return {
        ...state,
        errors: [],
        agree_to_terms: action.agree_to_terms.value
      }

    case types.ADD_LEAD_CLEAR_FORM:
      return {
        ...state,
        fields_map: initialState.fields_map,
        price: initialState.price,
        agree_to_terms: initialState.agree_to_terms,
      }

    case types.ADD_LEAD_FORM_HANDLE_CHANGE:
      return {
        ...state,
        errors: [],
        [action.payload.name]: action.payload.value,
      }

    case types.ADD_LEAD_GET_DB_FIELDS:
      return {
        ...state,
        db_fields: action.db_fields,
      }
    }
  }