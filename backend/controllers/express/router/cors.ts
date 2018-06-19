import { parse } from "url"

export function start(app, frontend) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      parse(frontend).protocol + "//" + parse(frontend).host,
    )
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Credentials", true)
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    )
    next()
  })
}
