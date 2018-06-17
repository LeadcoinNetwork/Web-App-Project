import * as types from "./types"

export const paymentsHistoryLoadingStart = () => {
  return {
    type: types.PAYMENTS_HISTORY_LOADING_START,
  }
}

export const paymentsHistoryLoadingEnd = () => {
  return {
    type: types.PAYMENTS_HISTORY_LOADING_END,
  }
}

export function paymentsHistoryUpdate(list) {
  return {
    type: types.PAYMENTS_HISTORY_UPDATE,
    payload: list,
  }
}

export function paymentsHistoryError(message) {
  return {
    type: types.PAYMENTS_HISTORY_ERROR,
    payload: message,
  }
}

export function paymentsHistoryExportPayment(id) {
  return {
    type: types.PAYMENTS_HISTORY_EXPORT_PAYMENT,
    payload: id,
  }
}

export const paymentsHistoryOnScrollBottom = () => {
  return {
    type: types.PAYMENTS_HISTORY_ON_SCROLL_BOTTOM,
  }
}
