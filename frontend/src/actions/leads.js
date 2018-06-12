import * as types from "./types"

const leadsMock = require("../mocks/leads.json")

export const setSelectedLeads = leads => ({
  type: types.SET_SELECTED_RECORDS,
  payload: leads,
})

export const getLeads = (dispatch, cb, page = 1, limit = 50) => {
  setTimeout(() => {
    dispatch({
      type: types.GET_LEADS,
      payload: {
        list: leadsMock,
        page,
        limit,
        total: leadsMock.length * 3,
      },
    })
    typeof cb === "function" ? cb() : null
  }, 250)
}
