import types from "./types"

export default {
  checkoutBuyStart() {
    return {
      type: types.CHECKOUT_BUY_START,
    }
  },
  checkoutBuySuccess() {
    return {
      type: types.CHECKOUT_BUY_SUCCESS,
    }
  },
  checkoutBuyError() {
    return {
      type: types.CHECKOUT_BUY_ERROR,
    }
  },
}
