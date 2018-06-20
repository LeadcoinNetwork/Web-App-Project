import * as types from "./types"

export function csvMappingGetDbFields(payload) {
  return {
    type: types.CSV_MAPPING_GET_DB_FIELDS,
    db_fields: payload,
  }
}

export function csvMappingClearForm() {
  return {
    type: types.CSV_MAPPING_CLEAR_FORM
  }
}

export function csvMappingGetFileFields(payload) {
  return {
    type: types.CSV_MAPPING_GET_FILE_FIELDS,
    file_fields: payload,
  }
}

export function csvMappingMapChange(name, value) {
  return {
    type: types.CSV_MAPPING_MAP_HANDLE_CHANGE,
    map_change: { name, value },
  }
}

export function csvMappingAgreeToTerms(value) {
  return {
    type: types.CSV_MAPPING_AGREE_TO_TERMS,
    agree_to_terms: { value },
  }
}

export function csvMappingFormChange(name, value) {
  return {
    type: types.CSV_MAPPING_FORM_HANDLE_CHANGE,
    payload: { name, value },
  }
}

export function csvMappingSubmit(payload) {
  return {
    type: types.CSV_MAPPING_SUBMIT,
    payload
  }
}

export function csvMappingError(errors) {
  return {
    type: types.CSV_MAPPING_ERROR,
    errors,
  }
}
