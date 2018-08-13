import { types } from "../actions"

const initialState = {
  name: "",
  email: "",
  password: "",
  error: {},
  remember: true,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_HANDLE_CHANGE:
      return {
        ...state,
        error: {},
        [action.payload.name]: action.payload.value,
      }
    case types.LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.LOGIN_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default login
