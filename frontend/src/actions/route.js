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
}
