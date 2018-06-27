import types from "../actions/types"

const initialState = {
  loading: true,
  list: [],
  error: "",
}

const notificationsTable = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFICATIONS_TABLE_LOADING_START:
      return {
        ...state,
        loading: true,
      }
    case types.NOTIFICATIONS_TABLE_LOADING_END:
      return {
        ...state,
        loading: false,
      }
    case types.NOTIFICATIONS_TABLE_UPDATE:
      return {
        ...state,
        list: action.payload,
      }
    case types.NOTIFICATIONS_TABLE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default notificationsTable
