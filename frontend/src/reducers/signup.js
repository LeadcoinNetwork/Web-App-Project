import { types } from "../actions"

const initialState = {
  name: "",
  email: "",
  password: "",
  error: "",
}

const signup = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_FORM_HANDLE_CHANGE:
      return {
        ...state,
        error: "",
        [action.payload.name]: action.payload.value,
      }
    case types.SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default signup
