import types from "../actions/types"
import fieldsData from "./fields-data"

const initialState = {
  fieldsData: undefined,
}

const fields = (state = initialState, action) => {
  switch (action.type) {
    case types.INDUSTRY_UPDATE:
      return {
        fieldsData: fieldsData[action.payload],
      }
    default:
      return state
  }
}

export default fields
