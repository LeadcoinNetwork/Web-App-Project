import * as types from "./types"

export function userMenuOpen() {
  return {
    type: types.USER_MENU_OPEN,
  }
}
export function userMenuClose() {
  return {
    type: types.USER_MENU_CLOSE,
  }
}
export function userMenuClick() {
  return {
    type: types.USER_MENU_CLICK,
  }
}