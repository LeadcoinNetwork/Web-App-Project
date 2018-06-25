import * as types from "./types"

export function checkoutShoppingCartUpdate(list) {
  return {
    type: types.CHECKOUT_SHOPPING_CART_UPDATE,
    payload: list,
  }
}
export function checkoutLoadingStart() {
  return {
    type: types.CHECKOUT_LOADING_START,
  }
}
export function checkoutLoadingFinish() {
  return {
    type: types.CHECKOUT_LOADING_FINISH,
  }
}
export function checkoutError(message) {
  return {
    type: types.CHECKOUT_ERROR,
    payload: message,
  }
}
export function checkoutOnScrollBottom() {
  return {
    type: types.CHECKOUT_ON_SCROLL_BOTTOM,
  }
}