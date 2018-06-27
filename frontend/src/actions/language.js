import * as types from "./types"

export function languageSelectorUpdate(contryCode) {
  return {
    type: types.LANGUAGE_SELECTOR_UPDATE,
    payload: contryCode,
  }
}