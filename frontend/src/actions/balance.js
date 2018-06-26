import * as types from "./types"

export function balanceWidgetUpdate(total, inEscrow) {
  return {
    type: types.BALANCE_WIDGET_UPDATE,
    payload: {
      total,
      inEscrow,
    },
  }
}
export function balanceWidgetLoadingStart() {
  return {
    type: types.BALANCE_WIDGET_LOADING_START,
  }
}
export function balanceWidgetLoadingFinish() {
  return {
    type: types.BALANCE_WIDGET_LOADING_FINISH,
  }
}
