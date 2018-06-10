import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import leads from "./leads"
import user from "./user"
import notifications from "./notifications"
import balance from "./balance"

const rootReducer = combineReducers({
  routerReducer,
  leads,
  user,
  notifications,
  balance,
  buyLeads: leads,
  sellLeads: leads,
  myLeads: leads,
  notifications,
})

export default rootReducer
