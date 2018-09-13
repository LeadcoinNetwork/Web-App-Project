import types from "./types"

export default {
  editLead(lead) {
    return {
      type: types.EDIT_LEAD_EDIT_LEAD,
      lead,
    }
  },
  editLeadAddError(name, value) {
    return {
      type: types.EDIT_LEAD_FORM_ERROR,
      error: { name, value },
    }
  },

  editLeadHandleFormChange(name, value) {
    return {
      type: types.EDIT_LEAD_HANDLE_FORM_CHANGE,
      payload: { name, value },
    }
  },

  editLeadAgreeToTerms(value) {
    return {
      type: types.EDIT_LEAD_AGREE_TO_TERMS,
      agree_to_terms: { value },
    }
  },

  editLeadLoadingStart() {
    return {
      type: types.EDIT_LEAD_LOADING_START,
    }
  },

  editLeadLoadingEnd() {
    return {
      type: types.EDIT_LEAD_LOADING_END,
    }
  },

  editLeadClearForm() {
    return {
      type: types.EDIT_LEAD_CLEAR_FORM,
    }
  },

  editLeadSubmitForm(payload) {
    return {
      type: types.EDIT_LEAD_SUBMIT_FORM,
      payload,
    }
  },

  editLeadSubmitSuccess() {
    return {
      type: types.EDIT_LEAD_SUBMIT_SUCCESS,
    }
  },

  editLeadLoadLeadForEdit(id) {
    return {
      type: types.EDIT_LEAD_LOAD_LEAD,
      id,
    }
  },
}
