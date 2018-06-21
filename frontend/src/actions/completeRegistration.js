import * as types from "./types"

export function completeRegistrationHandleChange(name, value) {
  return {
    type: types.COMPLETE_REGISTRATION_HANDLE_CHANGE,
    payload: { name, value },
  }
}

export function completeRegistrationSubmit() {
  return {
    type: types.COMPLETE_REGISTRATION_SUBMIT,
  }
}

export function completeRegistrationLoading() {
  return {
    type: types.COMPLETE_REGISTRATION_LOADING,
  }
}

export function completeRegistrationFinish() {
  return {
    type: types.COMPLETE_REGISTRATION_FINISH,
  }
}

export function completeRegistrationError(message) {
  return {
    type: types.COMPLETE_REGISTRATION_ERROR,
    payload: {
      message,
    },
  }
}
