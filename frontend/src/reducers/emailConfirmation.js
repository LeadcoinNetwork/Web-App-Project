import types from "Actions/types"

const initialState = {
  error: "",
}

const emailConfirmation = (state = initialState, action) => {
  switch (action.type) {
    case types.EMAIL_CONFIRMATION_ERROR:
      return {
        ...state,
        error: action.payload.message,
      }
    default:
      return state
  }
}

export default emailConfirmation
