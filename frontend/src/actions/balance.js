import types from "./types"

export default {
  balanceWidgetUpdate(total, inEscrow = 0) {
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
