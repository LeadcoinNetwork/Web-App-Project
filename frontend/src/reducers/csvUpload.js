import { types } from "../actions"

const initialState = {
  loading: false,
  file: "",
  errors: {},
  finished: false,
}

let newErrors = null
export default function(state = initialState, action) {
  switch (action.type) {
    case types.CSV_UPLOAD_RESET_FORM:
      return initialState
    case types.CSV_UPLOAD_SUCCESS:
      return {
        ...state,
        finished: true,
        errors: {},
      }
    case types.CSV_MAPPING_MAP_HANDLE_CHANGE:
    case types.CSV_MAPPING_FORM_HANDLE_CHANGE:
      return {
        ...state,
        errors: {},
      }
    case types.CSV_UPLOAD_LOADING_CHANGE:
      let { loading } = action
      return {
        ...state,
        loading,
        errors: {},
      }

    case types.CSV_MAPPING_AGREE_TO_TERMS:
      newErrors = { ...state.errors }
      delete newErrors["agree_to_terms"]
      return {
        ...state,
        errors: newErrors,
      }

    case types.CSV_UPLOAD_PICK_FILE:
      return {
        ...state,
        file: action.file,
        errors: {},
      }

    case types.CSV_UPLOAD_ERROR:
      return {
        ...state,
        loading: false,
        errors: {
          ...state.errors,
          [action.error.name]: action.error.value,
        },
      }
    default:
      return state
  }
}
