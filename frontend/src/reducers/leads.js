import types from "../actions/types"

const initialState = {
  list: [],
  sortBy: null,
  page: 1,
  limit: 5,
  total: 0,
  categories: [],
  category: "RealEstate",
  countries: [],
  country: "US",
  states: [],
  state: "NY",
  cities: [],
  city: "new york city",
  neighborhoods: [],
  neighborhood: [],
  propertyTypes: [],
  propertyType: [],
  price_min: null,
  price_max: null,
  budget_min: null,
  budget_max: null,
  rooms_min: null,
  rooms_max: null,
  size_min: null,
  size_max: null,
  floor_min: null,
  floor_max: null,
  search: null,
  error: "",
  loading: false,
  selected: new Set(),
}

const createReducerFor = namespace => {
  return (state = initialState, action) => {
    switch (action.type) {
      case types[namespace + "_FETCH_LEADS"]:
        return {
          ...state,
          loading: true,
          error: false,
        }
      case types[namespace + "_FETCH_SUCCESS"]:
        return {
          ...state,
          ...action.payload,
          loading: false,
          error: false,
          list: [...state.list, ...action.payload.list],
        }
      case types[namespace + "_FETCH_ERROR"]:
        return {
          ...state,
          loading: false,
        }
      case types[namespace + "_SET_SELECTED_LEADS"]:
        return {
          ...state,
          selected: action.payload,
        }
      default:
        return state
    }
  }
}

export default createReducerFor
