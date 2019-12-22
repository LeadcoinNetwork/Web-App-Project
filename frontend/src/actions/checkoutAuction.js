import types from "./types"

export default {
  checkoutAuctionBuyStart() {
    return {
      type: types.CHECKOUT_AUCTION_BUY_START,
    }
  },
  checkoutAuctionBuySuccess() {
    return {
      type: types.CHECKOUT_AUCTION_BUY_SUCCESS,
    }
  },
  checkoutAuctionBuyError(error) {
    return {
      type: types.CHECKOUT_AUCTION_BUY_ERROR,
      payload: error,
    }
  },
}
