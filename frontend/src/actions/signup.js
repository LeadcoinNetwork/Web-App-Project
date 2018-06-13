import * as types from "./types"

export function signupFormHandleChange(name, value) {
  return {
    type: types.SIGNUP_FORM_HANDLE_CHANGE,
    payload: { name, value },
  }
}

export function SignUpFormUserSubmit() {
  return {
    type: types.SIGNUP_SUBMIT,
  }
}

export function SIGNUP_LOADING() {
  return {
    type: types.SIGNUP_LOADING,
  }
}

export function SIGNUP_FORM_ERROR(message) {
  return {
    type: types.SIGNUP_FORM_ERROR,
    payload: {
      message,
    },
  }
}
