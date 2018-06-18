module.exports.start = app => {
  app.use((err, req, res, next) => {
    // customize Joi validation errors
    if (err.isJoi) {
      err.message = err.details.map(e => e.message).join("; ")
      err.status = 400
    }

    // respond with json body
    res.status(err.status || 500).json({
      error: err.message,
    })
    next(err)
  })
}
