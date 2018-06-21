import * as types from "./types"

export function csvUploadLoadingDone() {
  return {
    type: types.CSV_UPLOAD_LOADING_CHANGE,
    loading: false,
  }
}

export function csvUploadLoadingStart() {
  return {
    type: types.CSV_UPLOAD_LOADING_CHANGE,
    loading: true,
  }
}

export function csvUploadPickFile(file) {
  return {
    type: types.CSV_UPLOAD_PICK_FILE,
    file,
  }
}

export function csvUploadError(error) {
  return {
    type: types.CSV_UPLOAD_ERROR,
    error,
  }
}

export function csvUploadSubmit() {
  return {
    type: types.CSV_UPLOAD_SUBMIT
  }
}