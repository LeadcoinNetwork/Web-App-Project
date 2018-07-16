/**
 * Log everything with context.
 * Based on https://www.owasp.org/index.php/Logging_Cheat_Sheet
 *
 * Using process.env.FORCE_LOG
 */
var chalk = require("chalk")
require("dotenv").config() // Add support to show logs
var i = 0
declare var Zone: any
if (process.env.NODE_ENV != "test") {
  require("zone.js")
}
var shortid = require("shortid")
export default function LogModelAction(model, action?, data?) {
  if (typeof action == "undefined") {
    return (action, data?) => LogModelAction(model, action, data)
  }
  try {
    var id = Zone.current.get("req").id
  } catch (err) {
    // In case Zone not working...
    id = "#"
  }
  if (process.env.NODE_ENV == "test" && !process.env.FORCE_LOG) {
    return
  }
  if (action instanceof Error) {
    console.log(
      chalk.red("Error") +
        "(" +
        id +
        ") " +
        action.stack.replace(/.*node_modules.*\n/g, ""),
    )
  } else {
    model = chalk.inverse(model)
    action = chalk.inverse(action)
    // // if (action == "end") action = chalk.blue(action)
    // // if (action == "start") action = chalk.green(action)
    if (data && data.status == 500) data = chalk.red(JSON.stringify(data))
    if (data && data.request)
      data = chalk.inverse(data.request) + " " + JSON.stringify(data)
    console.log(
      `${model}:${action} (${id}) ${
        typeof data == "object" ? JSON.stringify(data) : data
      }`,
    )
  }
}

/**
 * Create a zone.
 * Zone contain id,ua, and ip.
 * Output to   the request details.
 * Output to console the response.
 */
export function expressMiddleware(req, res, next) {
  if (process.env.NODE_ENV == "test" && !process.env.FORCE_LOG) {
    return next()
  }
  var oldWrite = res.write,
    oldEnd = res.end,
    oldStatus = res.status,
    oldRedirect = res.redirect

  var chunks = []
  var status = ""

  res.write = function(chunk) {
    chunks.push(chunk)

    oldWrite.apply(res, arguments)
  }
  res.redirect = function(o) {
    console.log(arguments)
    return oldRedirect.call(res, o)
  }
  res.status = function(o) {
    status = o
    return oldStatus.call(res, o)
  }
  res.end = function(chunk) {
    if (chunk) chunks.push(chunk)
    try {
      var body = Buffer.concat(chunks).toString("utf8")
      body = JSON.parse(body)
    } catch (err) {}

    LogModelAction("request", "end", {
      status: status || res.statusCode,
      location: this.get("Location") || undefined,
      ...(typeof body == "object" ? body : { body }),
    })

    oldEnd.apply(res, arguments)
  }

  var id = shortid.generate()
  var data = {
    request: `${req.method} ${req.url}`,
    host: req.headers["host"],
    ua: req.headers["user-agent"],
    ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  }

  try {
    var requestZone = Zone.current.fork({
      name: "request",
      properties: {
        req: {
          id,
          ...data,
        },
      },
    })
    requestZone.run(() => {
      LogModelAction("request", "start", data)
      next()
    })
  } catch (err) {
    // In case Zone not working
    next()
  }
}
