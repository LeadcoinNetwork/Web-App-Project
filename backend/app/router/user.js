const User = require("../business-logic/user");

module.exports = {
  register,
  findById,
  updateById,
  deleteById
};

async function register(req, res, next) {
  try {
    var user = await User.register(req.body);
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

async function findById(req, res, next) {}
async function updateById(req, res, next) {}
