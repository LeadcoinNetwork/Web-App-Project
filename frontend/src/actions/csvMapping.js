import types from "./types"

export default {
  csvMappingGetDbFields(payload) {
    return {
      type: types.CSV_MAPPING_GET_DB_FIELDS,
      db_fields: payload,
    }
  },
  csvMappingClearForm() {
    return {
      type: types.CSV_MAPPING_CLEAR_FORM,
    }
  },

  csvMappingGetFileFields(payload) {
    return {
      type: types.CSV_MAPPING_GET_FILE_FIELDS,
      file_fields: payload,
    }
  },

  csvMappingMapChange(name, value) {
    return {
      type: types.CSV_MAPPING_MAP_HANDLE_CHANGE,
      map_change: { name, value },
    }
  },

  csvMappingAgreeToTerms(value) {
    return {
      type: types.CSV_MAPPING_AGREE_TO_TERMS,
      agree_to_terms: { value },
    }
  },

  csvMappingFormChange(name, value) {
    return {
      type: types.CSV_MAPPING_FORM_HANDLE_CHANGE,
      payload: { name, value },
    }
  },

  csvMappingSubmit(payload) {
    return {
      type: types.CSV_MAPPING_SUBMIT,
      payload,
    }
  },

  csvMappingError(errors) {
    return {
      type: types.CSV_MAPPING_ERROR,
      errors,
    }
  },
}
