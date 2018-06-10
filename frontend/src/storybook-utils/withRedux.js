import { action, configureActions } from "@storybook/addon-actions"
export function storyReduxLogger({ getState }) {
  return next => action("Redux Action")
}
