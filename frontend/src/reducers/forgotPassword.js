import { types } from "../actions"

const initialState = {
  email: "",
  loading: false,
}

const forgotPassword = (state = initialState, action) => {
  switch (action.type) {
    case types.FORGOT_PASSWORD_HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
    case types.FORGOT_PASSWORD_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.FORGOT_PASSWORD_FINISH:
      return {
        email: "",
        loading: false,
      }
    default:
      return state
  }
}

export default forgotPassword
