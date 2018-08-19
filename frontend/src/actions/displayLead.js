import types from "./types"

export default {
  displayLeadGet(lead) {
    return {
      type: types.DISPLAY_LEAD_GET,
      lead,
    }
  },
  displayLeadClear() {
    return {
      type: types.DISPLAY_LEAD_CLEAR,
    }
  },
}
