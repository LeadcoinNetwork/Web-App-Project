const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./config");
const router = require("./router");
const strategies = require("./controller/passport-strategies");

const app = express();

app.use(bodyParser.json());

app.use(config.baseURI, router);

app.use(passport.initialize());
passport.use(strategies.localStrategy);
passport.use(strategies.jwtStrategy);
passport.use(strategies.googleStrategy);
passport.use(strategies.facebookStrategy);

// respond with json body for 404 status
app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found"
  });
});

// custom error handler
app.use((err, req, res, next) => {
  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  // respond with json body
  res.status(err.status || 500).json({
    error: err.message
  });
  next(err);
});

module.exports = app.listen(config.app.port, () => {
  if (config.env == "test") return;
  console.log("listening on *:" + config.app.port);
});
