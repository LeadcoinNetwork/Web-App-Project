import LogModelActions from "../models/log-model-actions/log-model-actions"

export function start(app) {
  app.use((err, req, res, next) => {
    // customize Joi validation errors
    if (err.isJoi) {
      err.message = err.details.map(e => e.message).join("; ")
      err.status = 400
    }

    var status = err.status || 500

    LogModelActions("Error", err)

    if (status == 500) {
      try {
        res
        res.statusMessage = "Unexpected failure. We have been notified."
        res
          .status(500)
          .json({ error: "Unexpected failure. We have been notified." })
      } catch (err) {}
    } else {
      res.status(status).json({
        error: err.message,
      })
    }
  })
}
