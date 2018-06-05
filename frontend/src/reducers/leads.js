import * as types from "../actions/index";

const leadsMock = require("../mocks/leads.json");

const leads = (state = leadsMock, action) => {
  switch (action.type) {
    case types.GET_LEADS:
      return action.payload;
    default:
      return state;
  }
};

export default leads;
