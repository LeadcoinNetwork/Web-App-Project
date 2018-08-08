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
  checkoutBuyError(error) {
    return {
      type: types.CHECKOUT_BUY_ERROR,
      payload: error,
    }
  },
}
