import types from "./types"

export default {
  auctionBetSet(data) {
    return {
      type: types.AUCTION_BET_SET,
      payload: data,
    }
  },

  auctionBetStart() {
    return {
      type: types.AUCTION_BET_START,
    }
  },
  auctionBetSuccess() {
    return {
      type: types.AUCTION_BET_SUCCESS,
    }
  },
  auctionBetError(error) {
    return {
      type: types.AUCTION_BET_ERROR,
      payload: error,
    }
  },
}
