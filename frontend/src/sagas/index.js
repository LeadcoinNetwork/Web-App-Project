import signup from "./signup"
import login from "./login"
import forgotPassword from "./forgotPassword"
import fetchUserToState from "./fetchUserToState"
import logout from "./logout"
import homesaga from "./homesaga"
import snackbar from "./snackbar"
import emailConfirmation from "./emailConfirmation"
import csvMapping from "./csvMapping"
import completeRegistration from "./completeRegistration.js"
import addLead from "./addLead"
import redirectIfNotAllowed from "./redirectIfNotAllowed"
import sellLeads from "./soldLeads"
import boughtLeads from "./boughtLeads"
import myLeads from "./myLeads"

import language from "./language"

import { spawn, fork } from "redux-saga/effects"
import * as superagent from "superagent"

import API from "../api/index"

// Create a request object for all the API's
// This request object add the default backend URLs, and do other defaults.
// This request object is bein used only by the saga's on the frontend.
var request = function(method, url, data) {
  if (url[0] == "/") url = process.env.BACKEND + url
  return superagent[method.toLowerCase()](url)
    .withCredentials()
    .send(data)
}
var api = new API(request)

export default function* rootSaga() {
  var sagas = [
    redirectIfNotAllowed,
    login,
    forgotPassword,
    addLead,
    completeRegistration,
    emailConfirmation,
    logout,
    sellLeads,
    boughtLeads,
    myLeads,
    homesaga,
    fetchUserToState,
    signup,
    csvMapping,
    snackbar,
    language,
  ]
  for (var i in sagas) {
    yield spawn(sagas, api)
  }
}
