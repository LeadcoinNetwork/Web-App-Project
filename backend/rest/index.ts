import * as bodyParser from "body-parser"
const express = require("express")
import { Express as ExpressInterface } from "express"
//@ts-ignore cookie-parser is missing (not really)
import * as cookieParser from "cookie-parser"
import * as http from "http"
var fs = require("fs")
import { exec } from "child_process"

// Routes
import * as _404 from "./404"
import * as errorhandler from "./errorhandler"
import * as userRouter from "./user"
import * as auth from "./auth"
import * as leads from "./leads"
import * as csv from "./csv"
import * as cors from "./cors"
import * as notifications from "./notifications"

import AppPassports from "./passport/index"
const io = require("./io/io")

import AppLogic from "../app-logic/index"

interface props {
  appLogic: AppLogic
  env: string
  frontend: string
}

import * as LogModelActions from "../models/log-model-actions/log-model-actions"
import * as Google from "./google"
import { start } from "./user"

export default class RestServer {
  private appLogic: AppLogic
  private frontend
  private env

  constructor(props?: props) {
    if (props) {
      const { appLogic, env, frontend } = props
      this.appLogic = appLogic
      this.env = env
      this.frontend = frontend
    }
  }

  createHttpServer(): http.Server {
    const { appLogic } = this
    if (this.env === "development") {
      console.log("Allowing orpha/n SSL certificates")
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    }
    var expressApp: ExpressInterface = express()

    // Express no cache
    expressApp.use((req, res, next) => {
      res.header(
        "Cache-Control",
        "private, no-cache, no-store, must-revalidate",
      )
      res.header("Expires", "-1")
      res.header("Pragma", "no-cache")
      next()
    })

    // Log of request and response
    expressApp.use(LogModelActions.expressMiddleware)

    expressApp.use((req, res, next) => {
      // Uncommet below lines to test errors in express
      // eval("sdf()")
      next()
    })

    // AUTH
    Google.start({ appLogic, expressApp })

    // ROUTES
    expressApp.use(bodyParser.json({ limit: "100mb" }))
    expressApp.use(cookieParser())
    cors.start(expressApp, this.appLogic)

    AppPassports.start({ expressApp, appLogic: this.appLogic })
    auth.start({ appLogic: this.appLogic, expressApp })
    userRouter.start({ appLogic: this.appLogic, expressApp })
    leads.start({ appLogic, expressApp })
    notifications.start({ appLogic, expressApp })
    csv.start({ appLogic, expressApp })

    expressApp.route("/gitlog.txt").get((req, res) => {
      var gitlog = ""
      try {
        gitlog = fs.readFileSync("../gitlog.txt").toString()
      } catch (err) {}
      res.status(200)
      res.set("content-type", "text/text")
      res.send(gitlog)
    })

    _404.start(expressApp)
    errorhandler.start(expressApp)
    ///

    var httpServer = http.createServer(expressApp)
    io.connectToHTTP(httpServer)

    return httpServer
  }
}
