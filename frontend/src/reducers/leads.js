import types from "../actions/types"

const initialState = {
  list: [],
  metaData: {
    sortBy: ["lead_price", "housing_type", "city", "price"],
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
    countries: ["US", "IL", "AU", "IR"],
    states: ["NY", "ND", "SF", "AZ", "AK"],
    cities: ["new york city", "rochester", "albany", "yonkers", "white plains"],
    boroughs: ["bronx", "brooklyn", "manhattan", "queens", "staten island"],
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
    housing_types: ["rooftop", "gallery", "apartment", "office", "warehouse"],
  },
  sortBy: null,
  page: 0,
  limit: 20,
  total: 0,
  category: "realEstate",
  country: "US",
  state: "NY",
  location: "new york city",
  borough: "brooklyn",
  neighborhood: ["crown heights"],
  housing_type: ["apartment"],
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
  loading: true,
  selected: new Set(),
}

const createReducerFor = namespace => {
  return (state = initialState, action) => {
    switch (action.type) {
      case types["CLEAR_ALL_LEADS"]:
        return {
          ...state,
          loading: false,
          error: false,
          list: [],
        }
      case types[namespace + "_FETCH_LEADS"]:
        return {
          ...state,
          ...action.payload,
          loading: true,
          error: false,
        }
      case types[namespace + "_FETCH_SUCCESS"]:
        let currentIds = state.list.map(lead => lead.id)

        return {
          ...state,
          ...action.payload,
          loading: false,
          error: false,
          list: [
            ...state.list,
            ...action.payload.list.filter(
              lead => !currentIds.includes(lead.id),
            ),
          ],
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
