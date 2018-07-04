import types from "./types"

export default {
  gotoDefaultHome() {
    return {
      type: types.GOTO_DEFAULT_HOME,
    }
  },

  bootAgain() {
    return { type: types.BOOT_AGAIN }
  },
}
