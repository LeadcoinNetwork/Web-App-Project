import { types } from "../actions"

const initialState = {
  leadIds: [],
  file: "",
  errors: {},
  finished: false,
}

let newErrors = null

export default function(state = initialState, action) {
  switch (action.type) {
    case types.XLSX_EXPORT_IDS:
      return {
        ...state,
        leadIds: action.leadIds,
        errors: {},
      }

    case types.XLSX_IMPORT_FILE:
      return {
        ...state,
        file: action.file,
        errors: {},
      }

    default:
      return state
  }
}
