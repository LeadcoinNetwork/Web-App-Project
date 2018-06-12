import * as types from "./types"

export const PaymentHistoryClickRefresh = () => {
  return {
    type: types.PAYMENTS_HISTORY_START,
  }
}

export const getPayments = dispatch => {
  dispatch({ type: "GET_PAYMENTS" })
}
