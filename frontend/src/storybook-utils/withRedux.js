import { action, configureActions } from "@storybook/addon-actions"
export function storyReduxLogger({ getState }) {
  return next => _action => {
    action("Redux Action")
    next(_action)
  }
}
