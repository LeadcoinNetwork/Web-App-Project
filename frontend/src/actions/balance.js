import types from "./types"

export default {
  balanceWidgetUpdate(total, inEscrow) {
    return {
      type: types.BALANCE_WIDGET_UPDATE,
      payload: {
        total,
        inEscrow,
      },
    }
  },
  balanceWidgetLoadingStart() {
    return {
      type: types.BALANCE_WIDGET_LOADING_START,
    }
  },
  balanceWidgetLoadingFinish() {
    return {
      type: types.BALANCE_WIDGET_LOADING_FINISH,
    }
  },
}
