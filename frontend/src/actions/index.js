import io from "socket.io-client"
import leads from "../reducers/leads"
import * as types from "./types"

// MOCKS
const leadsMock = require("../mocks/leads.json")
const paymentsMock = require("../mocks/payments.json")

// API OBJECTS
const SOCKET = io("http://localhost:3000")

// ACTION CREATORS
export const setSelectedLeads = leads => ({
  type: types.SET_SELECTED_RECORDS,
  payload: leads,
})

// ASYNC ACTION CREATORS
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

export const connectToNotifications = dispatch => {
  SOCKET.on("notification", notification => {
    dispatch({
      type: types.SHOW_NOTIFICATION,
      payload: notification,
    })
  })
}

export const getPayments = dispatch => {
  dispatch({ type: types.PAYMENTS_HISTORY_START })

  setTimeout(() => {
    dispatch({
      type: types.PAYMENTS_HISTORY_UPDATE,
      payload: {
        fetchedAll: false,
        list: paymentsMock,
      },
    })
    dispatch({ type: types.PAYMENTS_HISTORY_FINISH })
  }, 500)
}

export function WithdrawElementOnScreen() {
  return {
    type: types.ACTION_WITHDRAW_ELEMENT_ON_SCREEN,
  }
}

export function WithdrawElementStartLoading() {
  return {
    type: types.ACTION_WITHDRAW_ELEMENT_START_LOADING,
  }
}
