import types from "./types"

export default {
  emailConfirmationResend() {
    return {
      type: types.EMAIL_CONFIRMATION_RESEND,
    }
  },

  emailConfirmationError(errors) {
    return {
      type: types.EMAIL_CONFIRMATION_ERROR,
      errors,
    }
  },
}
