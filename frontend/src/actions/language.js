import types from "./types"

export default {
  languageSelectorUpdate(contryCode) {
    return {
      type: types.LANGUAGE_SELECTOR_UPDATE,
      payload: contryCode,
    }
  },
  languageSelectorClick() {
    return {
      type: types.LANGUAGE_SELECTOR_CLICK,
    }
  },
  languageSelectorOpen() {
    return {
      type: types.LANGUAGE_SELECTOR_OPEN,
    }
  },
  languageSelectorClose() {
    return {
      type: types.LANGUAGE_SELECTOR_CLOSE,
    }
  },
}
