import types from "./types"

export default {
  csvUploadLoadingDone() {
    return {
      type: types.CSV_UPLOAD_LOADING_CHANGE,
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

  csvUploadError(error) {
    return {
      type: types.CSV_UPLOAD_ERROR,
      error,
    }
  },

  csvUploadSubmit() {
    return {
      type: types.CSV_UPLOAD_SUBMIT,
    }
  },
}
