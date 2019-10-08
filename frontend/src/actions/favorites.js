import types from "./types"

export default {
  favoritesAddStart() {
    return {
      type: types.FAVORITES_ADD_START,
    }
  },
  favoritesAddSuccess() {
    return {
      type: types.FAVORITES_ADD_SUCCESS,
    }
  },
  favoritesAddError(error) {
    return {
      type: types.FAVORITES_ADD_ERROR,
      payload: error,
    }
  },
  favoritesRemoveStart() {
    return {
      type: types.FAVORITES_REMOVE_START,
    }
  },
  favoritesRemoveSuccess() {
    return {
      type: types.FAVORITES_REMOVE_SUCCESS,
    }
  },
  favoritesRemoveError(error) {
    return {
      type: types.FAVORITES_REMOVE_ERROR,
      payload: error,
    }
  },
}
