import { types } from "../actions"

const initialState = {
  review: "",
  rating: 1,
  loading: false,
  error: {},
}

const review = (state = initialState, action) => {
  switch (action.type) {
    case types.REVIEW_HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
    case types.REVIEW_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.REVIEW_FINISH:
      return {
        ...state,
        email: "",
        loading: false,
      }
    case types.REVIEW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default review
