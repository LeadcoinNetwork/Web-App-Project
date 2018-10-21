import types from "../actions/types"
import { RealEstateFilters, DesignFilters } from "./filters-data"

const getCurrentIndustry = () => {
  const industry = window.localStorage.getItem("industry")
    ? window.localStorage.getItem("industry")
    : ""
  let industryFilters
  switch (industry) {
    case "Real Estate":
      industryFilters = RealEstateFilters
      break
    case "Design":
      industryFilters = DesignFilters
      break
    default:
      industryFilters = undefined
  }
  return {
    industry,
    industryFilters,
  }
}
const initialIndustry = getCurrentIndustry()
const initialState = {
  list: [],
  sortBy: null,
  sortOrder: null,
  page: 0,
  limit: 20,
  total: 0,
  fullyLoaded: false,
  filter: {
    industry: initialIndustry.industry,
    search: "",
    industryFilters: initialIndustry.industryFilters,
  },
  wasSearchClicked: false,
  expandIndustryFilters: false,
  error: "",
  loading: true,
  selected: new Set(),
}

const createReducerFor = namespace => {
  return (state = initialState, action) => {
    switch (action.type) {
      case types[namespace + "_FILTER_CHANGE"]:
        return {
          ...state,
          filter: action.payload,
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
          wasSearchClicked: true,
        }
      case types["CLEAR_ALL_LEADS"]:
      case types[namespace + "_CLEAR_LEADS"]:
        const currentIndustry = getCurrentIndustry()
        return {
          ...state,
          list: [],
          page: 0,
          total: 0,
          filter: {
            industry: currentIndustry.industry,
            search: "",
            industryFilters: currentIndustry.industryFilters,
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
          wasSearchClicked: state.filter.industry ? true : false,
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
      case types.INDUSTRY_UPDATE:
        let industryFilters = state.filter.industryFilters
        switch (action.payload) {
          case "Real Estate":
            if (state.filter.industry !== action.payload) {
              industryFilters = RealEstateFilters
            }
            break
          case "Design":
            if (state.filter.industry !== action.payload) {
              industryFilters = DesignFilters
            }
            break
          default:
            industryFilters = undefined
        }
        return {
          ...state,
          wasSearchClicked: false,
          filter: {
            ...state.filter,
            industry: action.payload,
            industryFilters,
          },
        }
      default:
        return state
    }
  }
}

export default createReducerFor
