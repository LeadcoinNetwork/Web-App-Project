const db = require("../mysql");

module.exports = {
  create,
  findBy,
  findById,
  findByProviderId,
  findByEmail,
  findByActivationKey,
  updateById,
  deleteById
};

async function create(user) {
  return await db.user.create(user);
}

async function findBy(param) {
  return await db.user.findById(param);
}

async function findById(userId) {
  return await db.user.findById(userId);
}

async function findByProviderId(provider, providerId) {
  return await db.user.findByProviderId(provider, providerId);
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
