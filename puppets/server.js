const express = require("express")
const devices = require("puppeteer/DeviceDescriptors")

module.exports = (runner, delay, clear_files) => {
  const server = express()
  let gd = devices.reduce((m, d) => {
    let d_arr = d.name.split(" ")
    let a = d_arr[0]
    let b = d_arr[1]
    if (!m[a]) {
      m[a] = {}
    }
    m[a][b] = d.name
    return m
  }, {})

  let state
  let current_device = null
  let runner_TO
  let in_progress = false
  let next_run

  const run = async () => {
    in_progress = true
    await clear_files()
    state = await runner()
    in_progress = false
    set_timeout()
  }

  const set_timeout = () => {
    clearTimeout(runner_TO)
    runner_TO = setTimeout(run, delay)
    next_run = new Date().valueOf() + delay
  }

  server.get("/health", (req, res) => {
    console.log(state)
    if (state) {
      state = Object.assign(state, {
        in_progress,
        next_run: new Date(next_run),
      })
      res.json(state)
    } else {
      res.status(400).send()
    }
  })

  server.use(express.static("slideshow"))

  server.get("/runNow", (req, res) => {
    if (in_progress) return res.send({ in_progress })
    run()
    res.send({ ok: 1 })
  })

  server.get("/setMobileDevice/:device_name", (req, res) => {
    current_device = req.params.device_name
    console.log({ current_device })
  })

  server.get("/app.less", (req, res) => {
    res.sendFile(__dirname + "/app.less")
  })

  server.get("/", (req, res) => {
    res.sendFile(__dirname + "/app.html")
  })

  server.get("/devices", (req, res) => {
    res.status(200).json(gd)
  })

  server.listen(30666, async e => {
    process.on("exit", async () => {
      console.log("Shutting Puppets Down")
      clearTimeout(runner_TO)
    })
    set_timeout()
    if (delay > 30000) await run()
  })
}
