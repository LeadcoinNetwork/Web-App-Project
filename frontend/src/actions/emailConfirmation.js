import types from "./types"

export default {
  emailConfirmationFormHandleChange(name, value) {
    return {
      type: types.EMAIL_CONFIRMATION_FORM_HANDLE_CHANGE,
      payload: { name, value },
    }
  },

  emailConfirmationConfirmed() {
    return {
      type: types.EMAIL_CONFIRMATION_CONFIRMED,
    }
  },

  emailConfirmationSent() {
    return {
      type: types.EMAIL_CONFIRMATION_SENT,
    }
  },

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
