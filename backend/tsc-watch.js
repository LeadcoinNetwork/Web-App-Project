var cp = require("child_process")
var p1 = cp.fork("node_modules/typescript/lib/tsc.js", ["--watch"], {
  stdio: "pipe",
})
var firstTime = true
var p

restart()
p1.stderr.on("data", function(a) {
  console.error(a.toString())
})
p1.stdout.on("data", function(a) {
  a = a.toString()
  console.log(a)
  if (a.match(/Found 0 err/)) {
    // finish complication with no error
    restart()
  } else if (a.match(/Found [0-9]+ error/)) {
    // finish complication with errors
  }
})

function restart() {
  if (firstTime) {
    console.log("Starting...")
    firstTime = false
    start()
  } else {
    console.log("Killing and starting...")
    p.kill()
    start()
  }
  function start() {
    p = cp.fork("node_modules/ts-node/dist/bin", ["index"], {
      stdio: "inherit",
    })
  }
}
