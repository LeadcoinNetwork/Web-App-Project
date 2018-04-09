const mysqlPool = require("./mysql-pool");

module.exports = {
  create,
  findByEmail,
  deleteById
};

function create(user) {
  return mysqlPool.query("INSERT INTO users SET ?", user);
}

function findByEmail(email) {
  return mysqlPool.query("SELECT * FROM users WHERE email = ?", email);
}

function deleteById(userId) {
  return mysqlPool.query("DELETE FROM users WHERE id = ?", userId);
}
