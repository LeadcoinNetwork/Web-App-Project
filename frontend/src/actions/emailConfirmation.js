import * as types from "./types"

export function emailConfirmationFormHandleChange(name, value) {
  return {
    type: types.EMAIL_CONFIRMATION_FORM_HANDLE_CHANGE,
    payload: { name, value },
  }
}

export function emailConfirmationConfirmed() {
  return {
    type: types.EMAIL_CONFIRMATION_CONFIRMED,
  }
}

export function emailConfirmationSent() {
  return {
    type: types.EMAIL_CONFIRMATION_SENT,
  }
}

export function emailConfirmationResend() {
  return {
    type: types.EMAIL_CONFIRMATION_RESEND,
  }
}

export function emailConfirmationError(errors) {
  return {
    type: types.EMAIL_CONFIRMATION_ERROR,
    errors,
  }
}
