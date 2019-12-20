import { types } from "../actions"

const initialState = {
  endDate: null,
  loading: false,
}

const addToAuction = (state = initialState, action) => {
  switch (action.type) {
    case types.MY_LEADS_ADD_TO_AUCTION_START:
      return {
        ...state,
        endDate: action.payload,
        loading: true,
      }
    case types.MY_LEADS_ADD_TO_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case types.MY_LEADS_ADD_TO_AUCTION_ERROR:
      return {
        endDate: null,
        loading: false,
      }
    default:
      return state
  }
}

export default addToAuction
