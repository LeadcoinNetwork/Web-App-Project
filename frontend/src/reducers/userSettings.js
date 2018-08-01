import { types } from "../actions"

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  loading: false,
  error: "",
}

const userSettings = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_SETTINGS_HANDLE_CHANGE:
      return {
        ...state,
        error: "",
        [action.payload.name]: action.payload.value,
      }
    case types.USER_SETTINGS_CLEAR:
      return initialState
    case types.USER_SETTINGS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.USER_SETTINGS_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.USER_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default userSettings
