import * as types from "./types"

export function userSettingsHandleChange(name, value) {
  return {
    type: types.USER_SETTINGS_HANDLE_CHANGE,
    payload: { name, value },
  }
}

/**
 * @param message{string}
 */
export function userSettingsError(message) {
  return {
    type: types.USER_SETTINGS_ERROR,
    payload: message,
  }
}

export function userSettingsSubmit() {
  return {
    type: types.USER_SETTINGS_SUBMIT,
  }
}

export function userSettingsLoading() {
  return {
    type: types.USER_SETTINGS_LOADING,
  }
}

export function userSettingsFinish() {
  return {
    type: types.USER_SETTINGS_FINISH,
  }
}