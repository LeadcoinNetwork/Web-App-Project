import { types } from "../actions"

const initialState = {
  db_fields: [],
  file_fields: [],
  fields_map: {},
  error: "",
  price: "",
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CSV_MAPPING_FORM_HANDLE_CHANGE:
      return {
        ...state,
        error: "",
        [action.payload.name]: action.payload.value,
      }
    case types.CSV_MAPPING_GET_DB_FIELDS:
      return {
        ...state,
        db_fields: action.payload,
      }
    case types.CSV_MAPPING_GET_FILE_FIELDS:
      return {
        ...state,
        file_fields: payload,
      }
    case types.LOGIN_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.LOGIN_FORM_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      }
    default:
      return state
  }
}
