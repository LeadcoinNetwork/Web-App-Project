import types from "./types"

export default {
  addLeadAddError(name, value) {
    return {
      type: types.ADD_LEAD_FORM_ERROR,
      error: { name, value },
    }
  },

  addLeadHandleFormChange(name, value) {
    return {
      type: types.ADD_LEAD_HANDLE_FORM_CHANGE,
      payload: { name, value },
    }
  },

  addLeadAgreeToTerms(value) {
    return {
      type: types.ADD_LEAD_AGREE_TO_TERMS,
      agree_to_terms: { value },
    }
  },

  addLeadLoadingStart() {
    return {
      type: types.ADD_LEAD_LOADING_START,
    }
  },

  addLeadLoadingEnd() {
    return {
      type: types.ADD_LEAD_LOADING_END,
    }
  },

  addLeadClearForm() {
    return {
      type: types.ADD_LEAD_CLEAR_FORM,
    }
  },

  addLeadSubmitForm(payload) {
    return {
      type: types.ADD_LEAD_SUBMIT_FORM,
      payload,
    }
  },

  addLeadSubmitSuccess() {
    return {
      type: types.ADD_LEAD_SUBMIT_SUCCESS,
    }
  },

  addLeadGetDbFields(payload) {
    return {
      type: types.ADD_LEAD_GET_DB_FIELDS,
      db_fields: payload,
    }
  },
}
