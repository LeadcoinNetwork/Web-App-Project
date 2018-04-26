const db = require("../mysql");

module.exports = {
  insert,
  update,
  find,
  remove
};

async function insert(user) {
  return await db.user.insert(user);
}

async function update(userId, user) {
  return await db.user.update(userId, user);
}

async function find(condition, fields) {
  return await db.user.find(condition, fields);
}

async function remove(userId) {
  return await db.user.remove(userId);
}
