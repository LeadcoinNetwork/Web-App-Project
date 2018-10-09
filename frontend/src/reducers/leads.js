import types from "../actions/types"
import statesData from "./states-data"

//filter 0 should always be the relevent industry categories with name: "Category", type: "select"
const RealEstateFilters = [
  {
    name: "Category",
    type: "select",
    options: [
      // "Buy",
      "Sell",
      // "Looking to rent",
      "Properties for rent",
    ],
    value: "",
  },
  {
    name: "State",
    type: "select",
    options: statesData,
    value: "",
  },
  {
    name: "Price",
    type: "range",
    inputType: "number",
    min: "",
    max: "",
  },
  {
    name: "Size",
    type: "range",
    inputType: "number",
    min: "",
    max: "",
  },
  {
    name: "Housing Type",
    type: "select",
    options: [
      "Building",
      "House",
      "Apartment",
      "Flat",
      "Condo",
      "Duplex",
      "Townhouse",
      "Cottage",
      "Rooftop",
      "Penthouse",
      "Manufactured",
      "Studio",
      "Gallery",
      "Farm",
      "Office",
      "Warehouse",
      "Land",
    ],
    value: "",
  },
  {
    name: "Date",
    type: "date",
    from: "",
    to: "",
  },
]

const initialState = {
  list: [],
  sortBy: null,
  page: 0,
  limit: 20,
  total: 0,
  fullyLoaded: false,
  filter: {
    industry: "",
    category: "",
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
            if (!filter.industryFilters) {
              filter.industryFilters = RealEstateFilters
            }
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
          page: 0,
          total: 0,
          filter: {
            industry: "",
            category: "",
            search: "",
            industryFilters: null,
          },
          selected: new Set(),
        }
      case types[namespace + "_CLEAR_LIST"]:
        return {
          ...state,
          list: [],
          page: 0,
          total: 0,
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
