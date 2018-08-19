import types from "./types"

export default {
  csvUploadReset() {
    return {
      type: types.CSV_UPLOAD_RESET_FORM,
    }
  },
  csvUploadSuccess() {
    return {
      type: types.CSV_UPLOAD_SUCCESS,
    }
  },
  csvUploadLoadingDone() {
    return {
      type: types.CSV_UPLOAD_LOADING_DONE,
      loading: false,
    }
  },
  csvUploadLoadingStart() {
    return {
      type: types.CSV_UPLOAD_LOADING_CHANGE,
      loading: true,
    }
  },

  csvUploadPickFile(file) {
    return {
      type: types.CSV_UPLOAD_PICK_FILE,
      file,
    }
  },

  csvUploadError(name, value) {
    return {
      type: types.CSV_UPLOAD_ERROR,
      error: { name, value },
    }
  },

  csvUploadSubmit() {
    return {
      type: types.CSV_UPLOAD_SUBMIT,
    }
  },
}
