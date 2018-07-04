import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import app from "./app"
import leads from "./leads"
import user from "./user"
import language from "./language"
import checkout from "./checkout"
import payments from "./payments"
import notifications from "./notifications"
import notificationsTable from "./notificationsTable"
import signup from "./signup"
import completeRegistration from "./completeRegistration"
import login from "./login"
import forgotPassword from "./forgotPassword"
import balance from "./balance"
import userSettings from "./userSettings"
import userMenu from "./userMenu"
import emailConfirmation from "./emailConfirmation"
import dispute from "./dispute"
import csvMapping from "./csvMapping"
import csvUpload from "./csvUpload"
import addLead from "./addLead"
import fields from "./fields"
import translate from "./translate"

const rootReducer = combineReducers({
  routerReducer,
  app,
  leads,
  user,
  language,
  checkout,
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
  forgotPassword,
  userSettings,
  userMenu,
  emailConfirmation,
  dispute,
  csvMapping,
  csvUpload,
  addLead,
  fields,
  translate,
})

export default rootReducer
