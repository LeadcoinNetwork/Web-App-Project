import { types } from "../actions"

const initialState = {
  batch_id: 0,
  loading: false,
  file: "",
  errors: {},
}

let newErrors = null
export default function(state = initialState, action) {
  switch (action.type) {
    case types.CSV_MAPPING_MAP_HANDLE_CHANGE:
    case types.CSV_MAPPING_FORM_HANDLE_CHANGE:
    case types.CSV_UPLOAD_LOADING_CHANGE:
      const { loading } = action
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
        errors: {
          ...state.errors,
          [action.error.name]: action.error.value,
        },
      }
    default:
      return state
  }
}
