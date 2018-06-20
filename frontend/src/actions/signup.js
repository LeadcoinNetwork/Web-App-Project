import * as types from "./types"

export function signupHandleChange(name, value) {
  return {
    type: types.SIGNUP_FORM_HANDLE_CHANGE,
    payload: { name, value },
  }
}

export function signupSubmit() {
  return {
    type: types.SIGNUP_SUBMIT,
  }
}

export function signupLoading() {
  return {
    type: types.SIGNUP_LOADING,
  }
}

export function signupFinish() {
  return {
    type: types.SIGNUP_FINISH,
  }
}

export function signupError(message) {
  return {
    type: types.SIGNUP_ERROR,
    payload: {
      message,
    },
  }
}
