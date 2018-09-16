import types from "../actions/types"
import statesData from "./states-data"

const RealEstateFilters = [
  {
    name: "Date",
    type: "date",
  },
  {
    name: "State",
    type: "select",
    data: statesData,
  },
  {
    name: "Price",
    type: "range",
  },
  {
    name: "Size",
    type: "range",
  },
  {
    name: "Housing Type",
    type: "select",
    options: [
      "Apartment",
      "House",
      "Cottage",
      "Flat",
      "Studio",
      "Farm",
      "Building",
      "Roof-Top",
      "Gallery",
      "Office",
      "Warehouse",
    ],
  },
]

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
  fullyLoaded: false,
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
  filter: {
    industry: "All",
    category: "All",
    search: "",
    industryFilters: null,
  },
  searchClicked: false,
  expandIndustryFilters: false,
  error: "",
  loading: true,
  selected: new Set(),
}

const createReducerFor = namespace => {
  return (state = initialState, action) => {
    switch (action.type) {
      case types[namespace + "_FILTER_CHANGE"]:
        let filter = action.payload
        switch (filter.industry) {
          case "Real Estate":
            filter.industryFilters = RealEstateFilters
            break
          default:
            filter.industryFilters = null
        }
        return {
          ...state,
          filter,
        }
      case types[namespace + "_EXPAND_FILTERS_CLICK"]:
        return {
          ...state,
          expandIndustryFilters: !state.expandIndustryFilters,
        }
      case types[namespace + "_EXPAND_FILTERS"]:
        return {
          ...state,
          expandIndustryFilters: true,
        }
      case types[namespace + "_CONTRACT_FILTERS"]:
        return {
          ...state,
          expandIndustryFilters: false,
        }
      case types[namespace + "_SEARCH_CLICKED"]:
        return {
          ...state,
          searchClicked: true,
        }
      case types["CLEAR_ALL_LEADS"]:
      case types[namespace + "_CLEAR_LEADS"]:
        return {
          ...state,
          list: [],
          filter: {
            industry: "All",
            category: "All",
            search: "",
            industryFilters: null,
          },
          selected: new Set(),
        }
      case types[namespace + "_LOADING_START"]:
        return {
          ...state,
          loading: true,
        }
      case types[namespace + "_LOADING_END"]:
        return {
          ...state,
          loading: false,
        }
      case types[namespace + "_FETCH_LEADS"]:
        return {
          ...state,
          ...action.payload,
          loading: true,
          error: false,
        }
      case types[namespace + "_FETCH_SUCCESS"]:
        const newLeads = action.payload.list.map(lead => ({
          ...lead,
          cardOpen: false,
        }))
        let currentIds = state.list.map(lead => lead.id)

        return {
          ...state,
          ...action.payload,
          loading: false,
          fullyLoaded: newLeads.length < state.limit,
          error: false,
          list: [
            ...state.list,
            ...newLeads.filter(lead => !currentIds.includes(lead.id)),
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
      case types[namespace + "_TOGGLE_CARD_VIEW"]:
        state.list[action.payload].cardOpen = !state.list[action.payload]
          .cardOpen
        return {
          ...state,
        }
      default:
        return state
    }
  }
}

export default createReducerFor
