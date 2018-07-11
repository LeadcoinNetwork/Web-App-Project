import types from "./types"

export default {
  toggleResultsMode: () => ({
    type: types.TOGGLE_RESULTS_MODE,
  }),
  notificationShow: () => ({
    type: types.NOTIFICATION_SHOW,
    payload: { message, type },
  }),
}
