import io from "socket.io-client";

const SOCKET = io("http://localhost:3000");

// ACTIONS TYPES
export const GET_LEADS = "GET_LEADS";
export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

// Actions
export const connectToNotifications = dispatch => {
  SOCKET.on("notification", notification => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: notification
    });
  });
};
