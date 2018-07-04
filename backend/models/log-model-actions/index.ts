var chalk = require("chalk")
var i = 0
export default function LopgModelAction(model, action, data) {
  var current = i++
  if (process.env.NODE_ENV == "test") {
    return
  }
  console.log(
    `${model}:${action}: (${current}) ${
      typeof data == "object" ? JSON.stringify(data) : data
    }`,
  )
  return function(c) {
    console.log(
      `${model}:${action}: (${current}) ${chalk.blue("Done")} ${
        typeof c == "object" ? JSON.stringify(c) : c
      }`,
    )
  }
}
