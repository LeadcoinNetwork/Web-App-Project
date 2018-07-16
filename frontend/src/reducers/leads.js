import types from "../actions/types"

const initialState = {
  list: [],
  sortBy: null,
  page: 1,
  limit: 5,
  total: 0,
  categories: [
    "realEstate",
    "hotels",
    "finance",
    "insurance",
    "automobile",
    "localServiceProviders",
    "websiteBuilding",
    "foodServices",
  ],
  category: "realEstate",
  countries: ["US", "IL", "AU", "IR"],
  country: "US",
  states: ["NY", "ND", "SF", "AZ", "AK"],
  state: "NY",
  cities: ["new york city", "rochester", "albany", "yonkers", "white plains"],
  city: "new york city",
  boroughs: ["bronx", "brooklyn", "manhattan", "queens", "staten island"],
  borough: "brooklyn",
  neighborhoods: [
    "crown heights",
    "prospect heights",
    "weeksville",
    "boerum hill",
    "brooklyn heights",
    "brooklyn navy yard",
    "clinton hill",
    "dumbo",
    "fort greene",
    "fulton ferry",
    "fulton mall",
    "vinegar hill",
  ],
  neighborhood: ["crown heights"],
  propertyTypes: ["rooftop", "gallery", "apartment", "office", "warehouse"],
  propertyType: ["apartment"],
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
