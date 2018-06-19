import * as types from "./types"

let leadsMock = require("../mocks/leads.json")

for (let i = 0; i < 10; i++) {
  leadsMock.push({
    ...leadsMock[i],
    id: i + "t",
  })
}

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
