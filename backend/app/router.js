const express = require("express");
const user = require("./user");

const router = express.Router();
module.exports = router;

router.post("/user", user.create);
router.get("/user/:userId", user.read);
router.put("/user/:userId", user.update);
router.delete("/user/:userId", user.delete);

