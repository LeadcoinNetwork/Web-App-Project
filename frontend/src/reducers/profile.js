import { types } from "../actions"

const initialState = {
  fname: "",
  lname: "",
  country: "",
  phone: "",
  company: "",
  rating: "",
  reviews: [],
  loading: false,
  error: "",
}

const profile = (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      }
    case types.PROFILE_FINISH:
      return {
        ...state,
        loading: false,
      }
    case types.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
  }
  return { ...state }
}

export default profile
