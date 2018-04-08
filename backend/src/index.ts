import express from "express";

var app = express();

app.get("/health", (req, res) => {
  res.send("server is online");
});
