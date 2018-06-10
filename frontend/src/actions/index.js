import io from "socket.io-client"
import leads from "../reducers/leads"

// MOCKS
const leadsMock = require("../mocks/leads.json")

// API OBJECTS
const SOCKET = io("http://localhost:3000")

// ACTIONS TYPES
export const GET_LEADS = "GET_LEADS"
export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION"
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION"
export const SET_SELECTED_RECORDS = "SET_SELECTED_RECORDS"

// ACTION CREATORS
export const setSelectedLeads = leads => ({
  type: SET_SELECTED_RECORDS,
  payload: leads
})

// ASYNC ACTION CREATORS
export const getLeads = (dispatch, cb, page = 1, limit = 50) => {
  setTimeout(() => {
    dispatch({
      type: GET_LEADS,
      payload: {
        list: leadsMock,
        page,
        limit,
        total: leadsMock.length * 3
      }
    })
    typeof cb === "function" ? cb() : null
  }, 250)
}

export const connectToNotifications = dispatch => {
  SOCKET.on("notification", notification => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: notification
    })
  })
}
