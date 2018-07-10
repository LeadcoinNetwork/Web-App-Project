import types from "./types"

export default {
  balanceUpdate(total, inEscrow = 0) {
    return {
      type: types.BALANCE_UPDATE,
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
  withdrawPageFormUpdate(name, vlaue) {
    return {
      type: types.WITHDRAW_PAGE_FORM_UPDATE,
      payload: {
        name,
        value,
      }
    }
  },
  withdrawPageLoadingStart() {
    return {
      type: types.WITHDRAW_PAGE_LOADING_START,
    }
  },
  withdrawPageLoadingFinish() {
    return {
      type: types.WITHDRAW_PAGE_LOADING_FINISH,
    }
  },
}
