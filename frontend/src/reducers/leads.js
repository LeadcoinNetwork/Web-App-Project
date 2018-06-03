import * as types from "../actions/index";

const records = require("../containers/TableData/records.json");

const leads = (state = records, action) => {
  switch (action.type) {
    case types.GET_LEADS:
      return action.payload;
    default:
      return state;
  }
};

export default leads;
