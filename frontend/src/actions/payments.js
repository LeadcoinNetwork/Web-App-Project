import types from "./types"

export default {
  paymentsHistoryLoadingStart() {
    return {
      type: types.PAYMENTS_HISTORY_LOADING_START,
    }
  },

  paymentsHistoryLoadingEnd() {
    return {
      type: types.PAYMENTS_HISTORY_LOADING_END,
    }
  },

  paymentsHistoryUpdate(list) {
    return {
      type: types.PAYMENTS_HISTORY_UPDATE,
      payload: list,
    }
  },

  paymentsHistoryError(message) {
    return {
      type: types.PAYMENTS_HISTORY_ERROR,
      payload: message,
    }
  },

  paymentsHistoryExportPayments() {
    return {
      type: types.PAYMENTS_HISTORY_EXPORT_PAYMENTS,
    }
  },

  paymentsHistoryOnScrollBottom() {
    return {
      type: types.PAYMENTS_HISTORY_ON_SCROLL_BOTTOM,
    }
  },
}
