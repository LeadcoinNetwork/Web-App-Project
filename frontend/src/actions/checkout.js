import types from "./types"

export default {
  checkoutLoadingStart() {
    return {
      type: types.CHECKOUT_LOADING_START,
    }
  },
  checkoutLoadingFinish() {
    return {
      type: types.CHECKOUT_LOADING_FINISH,
    }
  },
  checkoutError() {
    return {
      type: types.CHECKOUT_ERROR,
    }
  },
}
