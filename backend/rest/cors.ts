import { parse } from "url"
import AppLogic from "../app-logic/index"
import * as express from "express"
export function start(app: express.Express, appLogic: AppLogic) {
  app.use((req, res, next) => {
    var frontend
    frontend = appLogic.config.frontend

    res.header(
      "Access-Control-Allow-Origin",
      (req.headers.origin || "").toString(),
      // parse(frontend).protocol + "//" + parse(frontend).host,
    )
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    )
    next()
  })
  app.options("/*", (req, res) => {
    res.status(200).end()
  })
}
