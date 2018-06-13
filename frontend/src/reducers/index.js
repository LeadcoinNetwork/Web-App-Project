import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import app from "./app"
import leads from "./leads"
import user from "./user"
import payments from "./payments"
import notifications from "./notifications"
import balance from "./balance"
import signup from "./signup"
import login from "./login"

const rootReducer = combineReducers({
  routerReducer,
  app,
  leads,
  user,
  payments,
  notifications,
  balance,
  buyLeads: leads,
  sellLeads: leads,
  myLeads: leads,
  notifications,
  signup,
  login,
})

export default rootReducer
