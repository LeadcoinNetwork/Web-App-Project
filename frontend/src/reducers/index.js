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
import editLead from "./editlead"
import fields from "./fields"
import translate from "./translate"
import withdraw from "./withdraw"
import displayLead from "./displayLead"
import metamask from "./metamask"
import userProfileSettings from "./userProfileSettings"
import historyLead from "./historyLead"
import transactionHistory from "./transactionHistory"
import profile from "./profile"
import review from "./review"
import addToAuction from "./addToAuction"
import reviewsUser from "./reviewsUser"
import fieldsMy from "./fieldsMy"
import fieldsSell from "./fieldsSell"
import fieldsAuction from "./fieldsAuction"
import auctionBet from "./auctionBet"

const rootReducer = combineReducers({
  app,
  displayLead,
  user,
  language,
  checkout,
  payments,
  balance,
  buyLeads: createLeadsReducerFor("BUY_LEADS"),
  sellLeads: createLeadsReducerFor("SELL_LEADS"),
  myLeads: createLeadsReducerFor("MY_LEADS"),
  auctionLeads: createLeadsReducerFor("AUCTION_LEADS"),
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
  editLead,
  addLead,
  fields,
  translate,
  withdraw,
  metamask,
  userProfileSettings,
  transactionHistory,
  historyLead,
  profile,
  review,
  addToAuction,
  reviewsUser,
  fieldsMy,
  fieldsSell,
  fieldsAuction,
  auctionBet,
})

export default rootReducer
