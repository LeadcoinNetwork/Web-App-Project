const db = require("../mysql");

module.exports = {
  insert,
  find,
  remove
};

async function insert(token) {
  return await db.token.insert(token);
}

async function find(condition, fields) {
  return await db.token.find(condition, fields);
}

async function remove(userId) {
  return await db.token.remove(userId);
}
