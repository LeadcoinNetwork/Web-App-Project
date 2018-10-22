import { types } from "../actions"
import fieldsData from "./fields-data"

const initialIndustry = window.localStorage.getItem("industry")
const initialState = fieldsData[initialIndustry]
  ? fieldsData[initialIndustry]
  : {}

const fields = (state = initialState, action) => {
  switch (action.type) {
    case types.INDUSTRY_UPDATE:
      return fieldsData[action.payload] ? fieldsData[action.payload] : {}
    default:
      return state
  }
}

export default fields
