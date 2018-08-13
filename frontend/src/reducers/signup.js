import { types } from "../actions"

const initialState = {
  name: "",
  email: "",
  password: "",
  errors: {},
}

const signup = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_HANDLE_CHANGE:
      let newErrors = { ...state.errors }
      delete newErrors[action.payload.name]
      return {
        ...state,
        errors: newErrors,
        [action.payload.name]: action.payload.value,
      }
    case types.SIGNUP_LOADING:
      return {
        ...state,
        errors: {},
        loading: true,
      }
    case types.SIGNUP_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      }
    default:
      return state
  }
}

export default signup
