import types from "./types"

export default {
  industryUpdate(industry) {
    return {
      type: types.INDUSTRY_UPDATE,
      payload: industry,
    }
  },
}
