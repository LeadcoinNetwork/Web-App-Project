import signup from "./signup"
import login from "./login"
import loginOnBoot from "./loginOnBoot"
import logout from "./logout"
import homesaga from "./homesaga"
import csvMapping from "./csvMapping"
import completeRegistration from "./completeRegistration.js"
import addLead from "./addLead"
import { spawn } from "redux-saga/effects"

import * as superagent from "superagent"

import API from "../api/index"

// Create a request object for all the API'sץ
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
    login,
    addLead,
    completeRegistration,
    logout,
    homesaga,
    loginOnBoot,
    signup,
    csvMapping,
  ]
  for (var i in sagas) {
    yield spawn(sagas[i](api))
  }
}
