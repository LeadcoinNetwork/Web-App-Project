import * as types from "./types"

export function loginFormHandleChange(name, value) {
  return {
    type: types.LOGIN_FORM_HANDLE_CHANGE,
    payload: { name, value },
  }
}

export function loginFormUserSubmit() {
  return {
    type: types.LOGIN_SUBMIT,
  }
}

export function loginLoading() {
  return {
    type: types.LOGIN_LOADING,
  }
}

/**
 * @param message{string}
 */
export function loginFormError(message) {
  return {
    type: types.LOGIN_FORM_ERROR,
    payload: {
      message,
    },
  }
}
