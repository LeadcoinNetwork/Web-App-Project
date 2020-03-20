import types from "./types"

export default {
  xlsxUploadReset() {
    return {
      type: types.XLSX_UPLOAD_RESET_FORM,
    }
  },

  xlsxUploadSuccess() {
    return {
      type: types.XLSX_UPLOAD_SUCCESS,
    }
  },

  xlsxUploadLoadingDone() {
    return {
      type: types.XLSX_UPLOAD_LOADING_DONE,
      loading: false,
    }
  },

  xlsxUploadLoadingStart() {
    return {
      type: types.XLSX_UPLOAD_LOADING_CHANGE,
      loading: true,
    }
  },

  xlsxUploadPickFile(file) {
    return {
      type: types.XLSX_UPLOAD_PICK_FILE,
      file,
    }
  },

  xlsxUploadParseFile(file) {
    return {
      type: types.XLSX_PARSE_PICK_FILE,
      file,
    }
  },

  xlsxUploadError(name, value) {
    return {
      type: types.XLSX_UPLOAD_ERROR,
      error: { name, value },
    }
  },

  xlsxUploadSubmit() {
    return {
      type: types.XLSX_UPLOAD_SUBMIT,
    }
  },
}
