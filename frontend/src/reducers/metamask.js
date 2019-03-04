import types from "../actions/types"
let initialState = {
  loading: false,
  isActive: false,
  checked: false,
}
export default function(state = initialState, action) {
  switch (action.type) {
    case types.METAMASK_UPDATE_STATUS:
      console.log(action.payload)
      return {
        loading: false,
        isActive: action.payload.status,
      }
    default:
      return state
  }
}
