const express = require("express");

const router = express.Router();
module.exports = router;

router.use(require("./user"));
