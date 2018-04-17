const express = require("express");
const User = require("../controller/user");
const auth = require("../lib/auth");

const router = express.Router();
module.exports = router;

router.post("/user", create);

router
  .route("/user/:userId")
  .all(auth.authenticate("jwt"))
  .get(findById)
  .put(updateById)
  .delete(deleteById);

async function create(req, res, next) {
  try {
    let user = await User.create(req.body);
    res.status(201); // Created
    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function deleteById(req, res, next) {
  try {
    var status = await User.deleteById(req.params.userId);
    if (status) {
      res.status(200).json({
        ok: true
      });
    } else {
      res.status(404).json({
        error: "not found"
      });
    }
  } catch (e) {
    next(e);
  }
}

async function findById(req, res, next) {
  try {
    var user = await User.findById(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        error: "not found"
      });
    }
  } catch (e) {
    next(e);
  }
}

async function updateById(req, res, next) {
  try {
    var user = await User.updateById(req.params.userId, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        error: "not found"
      });
    }
  } catch (e) {
    next(e);
  }
}
