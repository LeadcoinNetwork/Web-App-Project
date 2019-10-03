import types from "./types"

export default {
  userProfileSettingsHandleChange(name, value) {
    return {
      type: types.USER_PROFILE_SETTINGS_HANDLE_CHANGE,
      payload: { name, value },
    }
  },

  userProfileSettingsError(message) {
    return {
      type: types.USER_PROFILE_SETTINGS_ERROR,
      payload: message,
    }
  },

  userProfileSettingsClear() {
    return {
      type: types.USER_PROFILE_SETTINGS_CLEAR,
    }
  },

  userProfileSettingsSubmit() {
    return {
      type: types.USER_PROFILE_SETTINGS_SUBMIT,
    }
  },

  userProfileSettingsLoading() {
    return {
      type: types.USER_PROFILE_SETTINGS_LOADING,
    }
  },

  userProfileSettingsFinish() {
    return {
      type: types.USER_PROFILE_SETTINGS_FINISH,
    }
  },
}
