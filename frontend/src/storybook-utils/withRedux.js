import { action, configureActions } from "@storybook/addon-actions"
export function storyReduxLogger({ getState }) {
  return next => _action => {
    action("REDUX " + JSON.stringify(_action))(_action)
    next(_action)
  }
}
