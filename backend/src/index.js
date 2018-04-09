// import * as express from 'express';
var app = express();

app.get("/health", function(req, res) {
  res.send("server is online");
});
