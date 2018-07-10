import { combineReducers } from "redux"
import app from "./app"
import createLeadsReducerFor from "./leads"
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
import withdraw from "./withdraw"

const rootReducer = combineReducers({
  app,
  user,
  language,
  checkout,
  payments,
  balance,
  buyLeads: createLeadsReducerFor("BUY_LEADS"),
  sellLeads: createLeadsReducerFor("SELL_LEADS"),
  myLeads: createLeadsReducerFor("MY_LEADS"),
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
  withdraw,
})

export default rootReducer
