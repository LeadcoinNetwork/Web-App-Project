import { types } from "Actions"

const initialState = {
  company: "",
  country: "",
  phone: {
    value: "",
  },
  error: "",
}

const completeRegistration = (state = initialState, action) => {
  switch (action.type) {
    case types.COMPLETE_REGISTRATION_HANDLE_CHANGE:
      return {
        ...state,
        error: "",
        [action.payload.name]: action.payload.value,
      }
    case types.COMPLETE_REGISTRATION_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.COMPLETE_REGISTRATION_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.COMPLETE_REGISTRATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      }
    default:
      return state
  }
}

export default completeRegistration
