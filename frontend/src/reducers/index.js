import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import app from "./app"
import leads from "./leads"
import user from "./user"
import payments from "./payments"
import notifications from "./notifications"
import notificationsTable from "./notifications-table"
import signup from "./signup"
import login from "./login"
import balance from "./balance"
import userSettings from "./user-settings"
import userMenu from "./user-menu"
import emailConfirmation from "./email-confirmation"

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
  notificationsTable,
  signup,
  login,
  userSettings,
  userMenu,
  emailConfirmation,
})

export default rootReducer
