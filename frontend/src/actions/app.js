import types from "./types"

export default {
  toggleResultsMode: () => ({
    type: types.TOGGLE_RESULTS_MODE,
  }),
  notificationShow: (message, type) => ({
    type: types.NOTIFICATION_SHOW,
    payload: { message, type },
  }),
}
