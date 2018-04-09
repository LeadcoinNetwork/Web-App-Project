const db = require("../db");

module.exports = {
  create,
  findByEmail,
  deleteById
};

async function create(user) {
  await db.user.create(user);
}

async function findByEmail(email) {
  var rows = await db.user.findByEmail(email);
  return rows[0];
}

async function deleteById(userId) {
  var status = await db.user.deleteById(userId);
  return status.affectedRows != 0;
}
