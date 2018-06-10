import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import leads from "./leads"
import notifications from "./notifications"
import balance from "./balance"

const rootReducer = combineReducers({
  routerReducer,
  leads,
  notifications,
  balance
})

export default rootReducer
