import types from "./types"

export default {
  myLeadsDeleteLeadBegin() {
    return {
      type: types.MY_LEADS_DELETE_LEAD_BEGIN,
    }
  },

  myLeadsDeleteLeadSuccess() {
    return {
      type: types.MY_LEADS_DELETE_LEAD_SUCCESS,
    }
  },

  myLeadsDeleteLeadError() {
    return {
      type: types.MY_LEADS_DELETE_LEAD_ERROR,
    }
  },
}
