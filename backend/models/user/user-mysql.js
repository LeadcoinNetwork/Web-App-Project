const mysqlPool = require("../mysql-pool/mysql-pool")

module.exports = {
  insert,
  update,
  find,
  remove,
}

async function insert(user) {
  let status = await mysqlPool.query("INSERT INTO users SET ?", user)
  return status.affectedRows != 0
}

async function update(userId, user) {
  let status = await mysqlPool.query("UPDATE users SET ? WHERE id = ?", [
    user,
    userId,
  ])
  return status.affectedRows != 0
}

async function find(condition, fields) {
  // convert condition to WHERE clause
  condition = Object.keys(condition)
    .map(key => {
      return `${key} = '${condition[key]}'`
    })
    .join(" AND ")

  if (condition) condition = `WHERE ${condition}`

  // convert fields to SELECT statement
  if (Array.isArray(fields) && fields.length) {
    fields = fields.join(", ")
  } else {
    fields = "*"
  }

  let rows = await mysqlPool.query(`SELECT ${fields} FROM users ${condition}`)
  rows = rows.map(row => Object.assign({}, row)) // remove RowDataPacket class
  return rows
}

async function remove(userId) {
  let status = await mysqlPool.query("DELETE FROM users WHERE id = ?", userId)
  return status.affectedRows != 0
}
