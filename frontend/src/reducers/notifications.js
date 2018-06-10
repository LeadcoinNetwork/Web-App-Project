import * as types from "../actions/index"

const initialState = {
  current: { message: null },
  list: []
}

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return {
        current: action.payload,
        list: state.list
      }
    default:
      return state
  }
}

export default notifications
