const express = require("express")
module.exports = (runner, delay, clear_files) => {
  const server = express()
  let state
  let runner_TO
  let in_progress = false
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
  }

  server.get("/health", (req, res) => {
    console.log(state)
    if (state) {
      state.in_progress=in_progress
      res.json(state)
    } else {
      res.status(400).send()
    }
  })

  server.use(express.static('slideshow'))

  server.get('/runNow', (req, res) => {
    if (in_progress) return res.send({in_progress})
    run()
    res.send({ok:1})
  })

  server.get('/app.less', (req, res) => {
    res.sendFile(__dirname+'/app.less')
  })
  server.get('/', (req, res) => {
    res.sendFile(__dirname+'/app.html')
  })

  server.listen(30666, async e => {
    process.on("exit", async () => {
      console.log("Shutting Puppets Down")
      clearTimeout(runner_TO)
    })
    set_timeout()
    if (delay > 30000)
      await run()
  })
}