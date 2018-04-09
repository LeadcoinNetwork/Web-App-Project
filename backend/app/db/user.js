const mysqlPool = require("./mysql-pool");

module.exports = {
  create,
  findByEmail,
  findById,
  updateById,
  deleteById
};

function create(user) {
  return mysqlPool.query("INSERT INTO users SET ?", user);
}

function findByEmail(email) {
  return mysqlPool.query("SELECT * FROM users WHERE email = ?", email);
}

function findById(userId) {
  return mysqlPool.query("SELECT * FROM users WHERE id = ?", userId);
}

function updateById(userId, user) {
  return mysqlPool.query("UPDATE users SET ? WHERE id = ?", [user, userId]);
}

function deleteById(userId) {
  return mysqlPool.query("DELETE FROM users WHERE id = ?", userId);
}
