const mysqlPool = require("./mysql-pool");

module.exports = {
  create,
  findBy,
  findById,
  findByEmail,
  findByActivationKey,
  updateById,
  deleteById
};

async function create(user) {
  let status = await mysqlPool.query("INSERT INTO users SET ?", user);
  return status.affectedRows != 0;
}

async function findBy(param) {
  let rows = await mysqlPool.query("SELECT * FROM users WHERE ?", param);
  let user = rows[0];
  return user && Object.assign({}, user);
}

async function findById(userId) {
  let rows = await mysqlPool.query("SELECT * FROM users WHERE id = ?", userId);
  let user = rows[0];
  return user && Object.assign({}, user);
}

async function findByEmail(email) {
  let rows = await mysqlPool.query(
    "SELECT * FROM users WHERE email = ?",
    email
  );
  let user = rows[0];
  return user && Object.assign({}, user);
}

async function findByActivationKey(key) {
  let rows = await mysqlPool.query(
    "SELECT * FROM users WHERE activation_key = ?",
    key
  );
  let user = rows[0];
  return user && Object.assign({}, user);
}

async function updateById(userId, data) {
  let status = await mysqlPool.query("UPDATE users SET ? WHERE id = ?", [
    data,
    userId
  ]);
  return status.affectedRows != 0;
}

async function deleteById(userId) {
  let status = await mysqlPool.query("DELETE FROM users WHERE id = ?", userId);
  return status.affectedRows != 0;
}
