import { action, configureActions } from "@storybook/addon-actions"
export function storyReduxLogger({ getState }) {
  return next => _action => {
    action("REDUX " + JSON.stringify(_action))(_action)
    setTimeout(()=>{
      action("NEW STORE")(getState())
    },0)
    next(_action)
  }
}
