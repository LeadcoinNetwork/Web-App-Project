export function start(app) {
  // respond with json body for 404 status
  app.use((req, res, next) => {
    res.status(404).json({
      path: "General",
      error: "Not Found",
    })
  })
}
