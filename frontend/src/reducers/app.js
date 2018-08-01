import types from "../actions/types"

const initialState = {
  cardsMode: false,
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_RESULTS_MODE:
      return {
        ...state,
        cardsMode: !state.cardsMode,
      }
    default:
      return state
  }
}

export default app
