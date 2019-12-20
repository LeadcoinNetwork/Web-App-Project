import types from "../actions/types"

const initialState = {
  loading: false,
  reviews: null,
  error: null,
}
const reviewsUser = (state = initialState, action) => {
  switch (action.type) {
    case types.REVIEWS_USER_START:
      return {
        ...state,
        loading: true,
      }
    case types.REVIEWS_USER_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
        error: null,
      }
    case types.REVIEWS_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default reviewsUser
