import types from "./types"

export default {
  addToAuctionStart() {
    return {
      type: types.MY_LEADS_ADD_TO_AUCTION_START,
    }
  },

  addToAuctionSuccess() {
    return {
      type: types.MY_LEADS_ADD_TO_AUCTION_SUCCESS,
    }
  },

  addToAuctionError() {
    return {
      type: types.MY_LEADS_ADD_TO_AUCTION_ERROR,
    }
  },
}
