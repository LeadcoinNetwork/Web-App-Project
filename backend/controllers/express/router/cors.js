var url = require("url")
module.exports.start = (app, frontend) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      url.parse(frontend).protocol + "//" + url.parse(frontend).host,
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
