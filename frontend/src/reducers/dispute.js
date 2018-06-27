import { types } from "../actions"

const initialState = {
  message: "",
  loading: false,
  error: "",
}

const dispute = (state = initialState, action) => {
  switch (action.type) {
    case types.DISPUTE_HANDLE_CHANGE:
      return {
        ...state,
        error: "",
        [action.payload.name]: action.payload.value,
      }
    case types.DISPUTE_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.DISPUTE_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.DISPUTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      }
    default:
      return state
  }
}

export default dispute
