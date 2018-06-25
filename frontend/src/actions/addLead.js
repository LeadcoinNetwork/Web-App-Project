
import * as types from "./types"

export function addLeadAddError(name, value) {
  return {
    type: types.ADD_LEAD_FORM_ERROR,
    error: { name, value },
  }
}

export function addLeadHandleFormChange(name, value) {
  return {
    type: types.ADD_LEAD_HANDLE_FORM_CHANGE,
    payload: { name, value },
  }
}

export function addLeadAgreeToTerms(value) {
  return {
    type: types.ADD_LEAD_AGREE_TO_TERMS,
    agree_to_terms: { value },
  }
}

export function addLeadLoadingEnd() {
  return {
    type: types.ADD_LEAD_TOGGLE_LOADING,
    loading: false
  }
}

export function addLeadLoadingStart() {
  return {
    type: types.ADD_LEAD_TOGGLE_LOADING,
    loading: true
  }
}

export function addLeadClearForm() {
  return {
    type: types.ADD_LEAD_CLEAR_FORM,
    values: {}
  }
}

export function addLeadSubmitForm(payload) {
  return {
    type: types.ADD_LEAD_SUBMIT_FORM,
    payload,
  }
}

export function addLeadGetDbFields(payload) {
  return {
    type: types.ADD_LEAD_GET_DB_FIELDS,
    db_fields: payload,
  }
}