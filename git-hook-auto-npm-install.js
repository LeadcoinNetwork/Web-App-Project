var cp = require("child_process")
var params = (process.env.GIT_PARAMS || "").split(" ")
if (params.length < 2) {
  // it's a merge
  var res = cp.execSync("git diff --name-only HEAD@{1} HEAD").toString()
  cp.execSync("git diff -U0 HEAD@{1} HEAD package.json", { stdio: [0, 1, 2] })
  cp.execSync("git diff -U0 HEAD@{1} HEAD frontend/package.json", {
    stdio: [0, 1, 2],
  })
  cp.execSync("git diff -U0 HEAD@{1} HEAD backend/package.json", {
    stdio: [0, 1, 2],
  })
  parseResult(res)
} else {
  var res = cp
    .execSync("git diff --name-only " + params[0] + " " + params[1])
    .toString()
  cp.execSync("git diff -U0 " + params[0] + " " + params[1] + " package.json", {
    stdio: [0, 1, 2],
  })
  cp.execSync(
    "git diff -U0 " + params[0] + " " + params[1] + " frontend/package.json",
    { stdio: [0, 1, 2] },
  )
  cp.execSync(
    "git diff -U0 " + params[0] + " " + params[1] + " backend/package.json",
    { stdio: [0, 1, 2] },
  )
  parseResult(res)
}

function parseResult(res) {
  if (res.match(/frontend\/package/)) {
    console.log(
      "frontend/package.json has been changed. Installing dependencies",
    )
    cp.execSync("npm i", { cwd: __dirname + "/frontend", stdio: [0, 1, 2] })
  }
  if (res.match(/backend\/package/)) {
    console.log(
      "backend/package.json has been changed. Installing dependencies",
    )
    cp.execSync("npm i", { cwd: __dirname + "/backend", stdio: [0, 1, 2] })
  }
  if (res.match(/(^|\n|\r)package/)) {
    console.log("package.json has been changed. Installing dependencies")
    cp.execSync("npm i", { cwd: __dirname + "/", stdio: [0, 1, 2] })
  }
}
