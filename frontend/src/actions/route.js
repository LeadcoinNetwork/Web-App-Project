import types from "./types"

export default {
  pushLocation({ pathname }) {
    return {
      type: "@@router/LOCATION_CHANGE",
      payload: {
        pathname: "/buy-leads",
        search: "",
        hash: "",
      },
    }
  },
  gotoDefaultHome() {
    return {
      type: types.GOTO_DEFAULT_HOME,
    }
  },

  bootAgain() {
    return { type: types.BOOT_AGAIN }
  },
}
