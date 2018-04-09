const User = require("../business-logic/user");

module.exports = {
  create,
  findById,
  updateById,
  deleteById
};

async function create(req, res, next) {
  try {
    var user = await User.create(req.body);
    res.status(201).json(user);
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
        error: "Not Found"
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
        error: "Not Found"
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
        error: "Not Found"
      });
    }
  } catch (e) {
    next(e);
  }
}
