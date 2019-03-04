import types from "./types"

export default {
  metamaskInit() {
    return {
      type: types.METAMASK_INIT,
    }
  },

  updateMetamaskStatus(status, checked) {
    return {
      type: types.METAMASK_UPDATE_STATUS,
      payload: {
        status,
      },
    }
  },
}
