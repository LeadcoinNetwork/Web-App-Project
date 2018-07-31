import types from "./types"

export default {
  userSettingsHandleChange(name, value) {
    return {
      type: types.USER_SETTINGS_HANDLE_CHANGE,
      payload: { name, value },
    }
  },

  userSettingsError(message) {
    return {
      type: types.USER_SETTINGS_ERROR,
      payload: message,
    }
  },

  userSettingsClear() {
    return {
      type: types.USER_SETTINGS_CLEAR,
    }
  },

  userSettingsSubmit() {
    return {
      type: types.USER_SETTINGS_SUBMIT,
    }
  },

  userSettingsLoading() {
    return {
      type: types.USER_SETTINGS_LOADING,
    }
  },

  userSettingsFinish() {
    return {
      type: types.USER_SETTINGS_FINISH,
    }
  },
}
