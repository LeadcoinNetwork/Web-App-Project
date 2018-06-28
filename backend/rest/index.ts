import * as bodyParser from "body-parser"
const express = require("express")
import { Express as ExpressInterface } from "express"
//@ts-ignore cookie-parser is missing (not really)
import * as cookieParser from "cookie-parser"
import * as http from "http"

// Routes
import * as _404 from "./404"
import * as errorhandler from "./errorhandler"
import * as userRouter from "./user"
import * as auth from "./auth"
import * as leads from "./leads"
import * as csv from "./csv"
import * as cors from "./cors"

import AppPassports from "./passport/index"
const io = require("./io/io")

import AppLogic from "../app-logic/index"

interface props {
  appLogic: AppLogic
  env: string
  frontend: string
}

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

    expressApp.use((req, res, next) => {
      if (process.env.NODE_ENV != "test") {
        console.log(req.method + " " + req.url)
      }
      next()
    })
    // ROUTES
    expressApp.use(bodyParser.json())
    expressApp.use(cookieParser())
    cors.start(expressApp, this.appLogic)

    AppPassports.start({ expressApp, appLogic: this.appLogic })
    auth.start({ appLogic: this.appLogic, expressApp })

    userRouter.start({ appLogic: this.appLogic, expressApp })

    // TODO leads
    leads.start({ appLogic: this.appLogic, expressApp })
    // TODO csv

    _404.start(expressApp)
    errorhandler.start(expressApp)
    ///

    var httpServer = http.createServer(expressApp)
    io.connectToHTTP(httpServer)

    return httpServer
  }
}
