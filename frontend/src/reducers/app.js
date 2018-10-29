import { types } from "../actions"

const initialState = {
  cardsMode: screen.width > 700 ? false : true,
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
