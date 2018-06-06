import io from "socket.io-client";
import leads from "../reducers/leads";

// MOCKS
const leadsMock = require("../mocks/leads.json");

// API OBJECTS
const SOCKET = io("http://localhost:3000");

// ACTIONS TYPES
export const GET_LEADS = "GET_LEADS";
export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

// ACTION CREATORS
export const getLeads = (dispatch, cb, page = 1, limit = 5) => {
  setTimeout(() => {
    dispatch({
      type: GET_LEADS,
      payload: {
        list: leadsMock,
        page,
        limit,
        total: leadsMock.length
      }
    });
    cb();
  }, 250);
};

export const connectToNotifications = dispatch => {
  SOCKET.on("notification", notification => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: notification
    });
  });
};
