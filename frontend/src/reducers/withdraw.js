import { types } from "../actions"

const initialState = {
  userEmail: "",
  loading: false,
  error: "",
}

const withdraw = (state = initialState, action) => {
  switch (action.type) {
    case types.WITHDRAW_PAGE_FORM_UPDATE:
      return {
        ...state,
        error: "",
        [action.payload.name]: action.payload.value,
      }
    case types.WITHDRAW_PAGE_LOADING_START:
      return {
        ...state,
        loading: true,
      }
    case types.WITHDRAW_PAGE_LOADING_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.WITHDRAW_PAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default withdraw
