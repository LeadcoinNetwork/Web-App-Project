import * as types from "../actions/types"

const initialState = {
  loading: false,
  confirmed: false,
  confirmation_sent: false,
  error: "",
}

const emailConfirmation = (state = initialState, action) => {
  switch (action.type) {
    case types.EMAIL_CONFIRMATION_RESEND:
      return {
        ...state,
        loading: true,
      }
    case types.EMAIL_CONFIRMATION_CONFIRMED:
      return {
        ...state,
        confirmed: true,
      }
    case types.EMAIL_CONFIRMATION_SENT:
      return {
        ...state,
        loading: false,
        confirmation_sent: true,
      }
    default:
      return state
  }
}

export default emailConfirmation
