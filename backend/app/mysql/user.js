const mysqlPool = require("./mysql-pool");

module.exports = {
  create,
  findByEmail,
  findById,
  updateById,
  deleteById
};

async function create(user) {
  let status = await mysqlPool.query("INSERT INTO users SET ?", user);
  return status.affectedRows != 0;
}

async function findByEmail(email) {
  let rows = await mysqlPool.query(
    "SELECT * FROM users WHERE email = ?",
    email
  );
  let user = rows[0];
  return user && Object.assign({}, user);
}

async function findById(userId) {
  let rows = await mysqlPool.query("SELECT * FROM users WHERE id = ?", userId);
  let user = rows[0];
  return user && Object.assign({}, user);
}

async function updateById(userId, user) {
  let status = await mysqlPool.query("UPDATE users SET ? WHERE id = ?", [
    user,
    userId
  ]);
  return status.affectedRows != 0;
}

async function deleteById(userId) {
  let status = await mysqlPool.query("DELETE FROM users WHERE id = ?", userId);
  return status.affectedRows != 0;
}
