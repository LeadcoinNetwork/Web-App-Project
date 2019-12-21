import types from "../actions/types"

const initialState = {
  bet: null,
  loading: false,
  error: {},
}

const auctionBet = (state = initialState, action) => {
  switch (action.type) {
    case types.AUCTION_BET_SET:
      return {
        ...state,
        bet: action.payload.bet,
      }
    case types.AUCTION_BET_START:
      return {
        ...state,
        loading: true,
      }
    case types.AUCTION_BET_SUCCESS:
      return {
        ...state,
        loading: false,
        bet: null,
      }
    case types.AUCTION_BET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        bet: null,
      }
    default:
      return state
  }
}

export default auctionBet
