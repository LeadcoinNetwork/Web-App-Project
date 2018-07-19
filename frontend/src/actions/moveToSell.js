import types from "./types"

export default {
  myLeadsMoveToSellBegin() {
    return {
      type: types.MY_LEADS_MOVE_TO_SELL_BEGIN,
    }
  },

  myLeadsMoveToSellSuccess() {
    return {
      type: types.MY_LEADS_MOVE_TO_SELL_SUCCESS,
    }
  },

  myLeadsMoveToSellError() {
    return {
      type: types.MY_LEADS_MOVE_TO_SELL_ERROR,
    }
  },
}
