import types from "./types"

export default {
  userMenuOpen() {
    return {
      type: types.USER_MENU_OPEN,
    }
  },
  userMenuClose() {
    return {
      type: types.USER_MENU_CLOSE,
    }
  },
  userMenuClick() {
    return {
      type: types.USER_MENU_CLICK,
    }
  },
}
