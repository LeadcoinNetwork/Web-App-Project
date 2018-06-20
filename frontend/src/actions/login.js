import * as types from "./types"

export function loginHandleChange(name, value) {
  return {
    type: types.LOGIN_HANDLE_CHANGE,
    payload: { name, value },
  }
}

export function loginUserSubmit() {
  return {
    type: types.LOGIN_SUBMIT,
  }
}

export function loginLoading() {
  return {
    type: types.LOGIN_LOADING,
  }
}

export function loginError(message) {
  return {
    type: types.LOGIN_ERROR,
    payload: {
      message,
    },
  }
}
