import types from "../actions/types"
import { Numbers } from "utils/numbers"

const initialState = {
  loading: false,
  list: [],
  totalPrice: "$0.00",
  error: "",
}

const checkout = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_SHOPPING_CART_UPDATE:
      return {
        ...state,
        list: action.payload,
        totalPrice: Numbers.priceString(
          action.payload.reduce((price, lead) => price + lead.price, 0),
        ),
      }
    case types.CHECKOUT_LOADING_START:
      return {
        ...state,
        loading: true,
      }
    case types.CHECKOUT_LOADING_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.CHECKOUT_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default checkout
