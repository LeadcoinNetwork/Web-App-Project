import types from "./types"

export default {
  emailConfirmationResend() {
    return {
      type: types.EMAIL_CONFIRMATION_RESEND,
    }
  },
}
