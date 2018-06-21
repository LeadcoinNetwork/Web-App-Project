import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import app from "./app"
import leads from "./leads"
import user from "./user"
import payments from "./payments"
import notifications from "./notifications"
import notificationsTable from "./notifications-table"
import signup from "./signup"
import completeRegistration from "./completeRegistration"
import login from "./login"
import balance from "./balance"
import userSettings from "./user-settings"
import userMenu from "./user-menu"
import emailConfirmation from "./email-confirmation"
import csvMapping from "./csvMapping"
import csvUpload from "./csvUpload"
import addLead from "./addLead"

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
  completeRegistration,
  login,
  userSettings,
  userMenu,
  emailConfirmation,
  csvMapping,
  csvUpload,
  addLead,
})

export default rootReducer
