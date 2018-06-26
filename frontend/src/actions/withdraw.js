import types from "./types"

export default {
  WithdrawElementOnScreen() {
    return {
      type: types.ACTION_WITHDRAW_ELEMENT_ON_SCREEN,
    }
  },
  WithdrawElementStartLoading() {
    return {
      type: types.ACTION_WITHDRAW_ELEMENT_START_LOADING,
    }
  },
}
