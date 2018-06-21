
import { types } from "../actions"

const initialState = {
  batch_id: 0,
  loading: false,
  file: "",
  errors: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CSV_UPLOAD_LOADING_CHANGE:
      const {loading} = action
      return {
        ...state,
        loading,
      }

    case types.CSV_UPLOAD_PICK_FILE:
      return {
        ...state,
        file: action.file,
      }

    case types.CSV_UPLOAD_ERROR:
      const errors = state.errors
      errors.push(action.error)
      return {
        ...state,
        errors,
      }
    default:
      return state
  }
}