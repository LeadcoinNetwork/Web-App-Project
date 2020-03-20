import signup from "./signup"
import login from "./login"
import forgotPassword from "./forgotPassword"
import fetchUserToState from "./fetchUserToState"
import logout from "./logout"
import changePassword from "./changePassword"
import homesaga from "./homesaga"
import snackbar from "./snackbar"
import emailConfirmation from "./emailConfirmation"
import csvMapping from "./csvMapping"
import completeRegistration from "./completeRegistration"
import editLead from "./editLead"
import loadLeadForEdit from "./loadLeadForEdit"
import addLead from "./addLead"
import redirectIfNotAllowed from "./redirectIfNotAllowed"
import sellLeads from "./sellLeads"
import buyLeads from "./buyLeads"
import checkout from "./checkout"
import myLeads from "./myLeads"
import csvUpload from "./csvUpload"
import xlsxUpload from "./xlsxUpload"
import xlsxExport from "./xlsxExport"
import moveToSell from "./moveToSell"
import language from "./language"
import inlinemanual from "./inlinemanual"
import notifications from "./notifications"
import googleAnalytics from "./googleanalytics"
import metamask from "./metamask"
import notificationsCreate from "./notificationCreate"
import editWallet from "./walletSettings"
import updateUser from "./updateUser"
import favorites from "./favorites"
import historyLead from "./historyLead"
import auctionLeads from "./auctionLeads"

import { spawn, fork } from "redux-saga/effects"
import * as superagent from "superagent"

import API from "../api/index"
import favoritesRemove from "./favoritesRemove"
import transactionHistory from "./transactionHistory"
import addToAuction from "./addToAuction"
import reviewsUser from "./reviewsUser"
import reviewSubmit from "./reviewSubmit"
import auctionBet from "./auctionBet"
import checkoutAuction from "./checkoutAuction"

// Create a request object for all the API's
// This request object add the default backend URLs, and do other defaults.
// This request object is bein used only by the saga's on the frontend.
var request = function(method, url, data, query) {
  if (url[0] == "/") url = process.env.BACKEND + url
  return superagent[method.toLowerCase()](url)
    .withCredentials()
    .query(query)
    .send(data)
}

var api = new API(request)

export default function* rootSaga() {
  var sagas = [
    redirectIfNotAllowed,
    csvUpload,
    xlsxUpload,
    xlsxExport,
    login,
    forgotPassword,
    addLead,
    editLead,
    loadLeadForEdit,
    completeRegistration,
    emailConfirmation,
    changePassword,
    logout,
    homesaga,
    fetchUserToState,
    signup,
    csvMapping,
    snackbar,
    language,
    sellLeads,
    buyLeads,
    checkout,
    myLeads,
    moveToSell,
    metamask,
    inlinemanual,
    notifications,
    googleAnalytics,
    notificationsCreate,
    editWallet,
    updateUser,
    favorites,
    favoritesRemove,
    historyLead,
    transactionHistory,
    auctionLeads,
    addToAuction,
    reviewsUser,
    reviewSubmit,
    auctionBet,
    checkoutAuction,
  ]
  for (var i in sagas) {
    yield fork(sagas[i], api)
  }
}
