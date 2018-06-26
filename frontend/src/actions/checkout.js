import types from "./types"

export default {
  checkoutShoppingCartUpdate(list) {
    return {
      type: types.CHECKOUT_SHOPPING_CART_UPDATE,
      payload: list,
    }
  },
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
  checkoutError(message) {
    return {
      type: types.CHECKOUT_ERROR,
      payload: message,
    }
  },
  checkoutOnScrollBottom() {
    return {
      type: types.CHECKOUT_ON_SCROLL_BOTTOM,
    }
  },
}
