const db = require("../mysql");

module.exports = {
  create,
  findByEmail,
  findById,
  updateById,
  deleteById,
  login
};

async function create(user) {
  return await db.user.create(user);
}

async function findByEmail(email) {
  return await db.user.findByEmail(email);
}

async function findById(userId) {
  return await db.user.findById(userId);
}

async function updateById(userId, user) {
  return await db.user.updateById(userId, user);
}

async function deleteById(userId) {
  return await db.user.deleteById(userId);
}

async function login(userId) {
  return await db.user.login(userId);
}
