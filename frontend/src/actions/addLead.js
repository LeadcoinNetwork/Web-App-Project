
import * as types from "./types"

export function addLeadGetDbFields(payload) {
  return {
    type: types.ADD_LEAD_GET_DB_FIELDS,
    db_fields: payload,
  }
}