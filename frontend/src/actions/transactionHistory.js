import types from "./types"

export default {
  transactionHistoryFetch() {
    return {
      type: types.TRANSACTION_HISTORY_FETCH,
    }
  },

  transactionHistorySuccess(data) {
    return {
      type: types.TRANSACTION_HISTORY_SUCCESS,
      payload: data,
    }
  },

  transactionHistoryError(error) {
    return {
      type: types.TRANSACTION_HISTORY_ERROR,
      payload: error,
    }
  },
}
