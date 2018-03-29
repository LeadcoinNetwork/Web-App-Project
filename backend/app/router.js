const express = require("express");
const user = require("./user");

var router = (module.exports = express.Router());

router.post("/user.register", user.create, user.get);
