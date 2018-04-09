const express = require("express");
const user = require("./user");

const router = express.Router();
module.exports = router;

router.post("/user", user.register);
router.get("/user/:userId", user.findById);
router.put("/user/:userId", user.updateById);
router.delete("/user/:userId", user.deleteById);
