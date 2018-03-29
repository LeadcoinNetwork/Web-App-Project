const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const router = require("./router");

const app = express();

app.use(bodyParser.json());

app.use("/api/v1", router);

// respond with json body for 404 status
app.use((req, res, next) => {
  res.status(404).json({
    error: "not found"
  });
});

// respond with json body for internal errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  });
  next(err);
});

module.exports = app.listen(config.app.port, () => {
  if (config.env == "test") return;
  console.log("listening on *:" + config.app.port);
});
