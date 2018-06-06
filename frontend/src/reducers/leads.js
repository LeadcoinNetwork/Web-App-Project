import * as types from "../actions/index";

const initialState = {
  page: 1,
  limit: 5,
  total: 0,
  list: []
};

const leads = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LEADS:
      return {
        ...action.payload,
        list: [...state.list, ...action.payload.list]
      };
    default:
      return state;
  }
};

export default leads;
