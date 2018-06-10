import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import leads from "./leads"
import notifications from "./notifications"

const rootReducer = combineReducers({
  routerReducer,
  buyLeads: leads,
  sellLeads: leads,
  myLeads: leads,
  notifications
})

export default rootReducer
