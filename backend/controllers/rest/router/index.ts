import * as bodyParser from "body-parser"
const express = require("express")
import { Express as ExpressInterface } from "express"
//@ts-ignore cookie-parser is missing (not really)
import * as cookieParser from "cookie-parser"

// Internal Modules
const router = require("./router/index")

// Routes
import * as _404 from "./404"
import * as errorhandler from "./errorhandler"
import * as userRouter from "./user"
import * as auth from "./auth"
import * as leads from "./leads"
import * as csv from "./csv"
import * as cors from "./cors"
import AppPassports from "../passport/index"
const io = require("./io/io")

import AppLogic from "../../../app-logic/index"

export default class RestServer {
  private appLogic: AppLogic
  private frontend
  private env

  constructor({
    appLogic,
    env,
    frontend,
  }: {
    appLogic: AppLogic
    env: string
    frontend: string
  }) {
    this.appLogic = appLogic
    this.env = env
    this.frontend = frontend
  }

  createExpressServer(): ExpressInterface {
    if (this.env === "development") {
      console.log("Allowing orpha/n SSL certificates")
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    }

    var expressApp: ExpressInterface = express()

    // ROUTES
    expressApp.use(bodyParser.json())
    expressApp.use(cookieParser())
    cors.start(expressApp, this.frontend)

    // AppPassports.start({ expressApp, appLogic: this.appLogic })
    // auth.start({ appLogic })

    userRouter.start({ appLogic })

    // TODO leads
    // TODO csv

    _404.start(expressApp)
    errorhandler.start(expressApp)
    ///

    io.connectToHTTP(expressApp)

    router.start({
      expressApp,
      appLogic: this.appLogic,
    })
    return expressApp
  }
}
