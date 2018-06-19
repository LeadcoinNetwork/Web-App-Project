import * as types from "./types"

export function csvMappingGetDbFields(payload) {
  return {
    type: types.CSV_MAPPING_GET_DB_FIELDS,
    payload ,
  }
}

export function csvMappingGetFileFields(payload) {
  return {
    type: types.CSV_MAPPING_GET_FILE_FIELDS,
    payload,
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
