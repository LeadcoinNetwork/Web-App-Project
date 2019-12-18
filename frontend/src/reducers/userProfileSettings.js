import { types } from "../actions"

const initialState = {
  fname: "",
  lname: "",
  country: "",
  phone: "",
  company: "",
  getNotifications: false,
  getEmails: false,
  loading: false,
  error: "",
}

const userProfileSettings = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_PROFILE_SETTINGS_HANDLE_CHANGE:
      return {
        ...state,
        error: "",
        [action.payload.name]: action.payload.value,
      }
    case types.USER_PROFILE_SETTINGS_CLEAR:
      return initialState
    case types.USER_PROFILE_SETTINGS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.USER_PROFILE_SETTINGS_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.USER_PROFILE_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
  }
  return { ...state }
}

export default userProfileSettings
