const db = require("../mysql");

module.exports = {
  create,
  findById,
  findByEmail,
  findByActivationKey,
  updateById,
  deleteById
};

async function create(user) {
  return await db.user.create(user);
}

async function findById(userId) {
  return await db.user.findById(userId);
}

async function findByEmail(email) {
  return await db.user.findByEmail(email);
}

async function findByActivationKey(key) {
  return await db.user.findByActivationKey(key);
}

async function updateById(userId, user) {
  return await db.user.updateById(userId, user);
}

async function deleteById(userId) {
  return await db.user.deleteById(userId);
}
