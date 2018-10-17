import types from "../actions/types"
import fieldsData from "./fields-data"

const initialState = {}

const fields = (state = initialState, action) => {
  switch (action.type) {
    case types.INDUSTRY_UPDATE:
      return fieldsData[action.payload] ? fieldsData[action.payload] : {}
    default:
      return state
  }
}

export default fields
