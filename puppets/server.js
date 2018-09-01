const express = require("express")
module.exports = (get_global_state) => {
  const server = express()
  server.get("/health", (req, res) => {
    const state = get_global_state()
    if (state)
      res.json(state)
    else 
      res.status(400).send()
  })

  server.use(express.static('slideshow'))

  server.get('/app.less', (req, res) => {
    res.sendFile(__dirname+'/app.less')
  })
  server.get('/', (req, res) => {
    res.sendFile(__dirname+'/app.html')
  })

  server.listen(30666, async e => {
  })
}