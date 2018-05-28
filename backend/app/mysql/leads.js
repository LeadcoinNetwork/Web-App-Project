const mysqlPool = require("./mysql-pool")

module.exports = {
  insert, find, remove, update
}

async function insert(lead) {
  let status = await mysqlPool.query("INSERT INTO leads SET ?", lead)
  return status.affectedRows != 0
}

async function update(_id, lead) {
  let status = await mysqlPool.query("UPDATE leads SET ? WHERE id = ?", [
    lead,
    _id
  ]);
  return status.affectedRows != 0;
}

async function find(condition, fields, where_additions = []) {
  // convert condition to WHERE clause
  condition = Object.keys(condition)
    .map(key => {
      return `${key} = '${condition[key]}'`
    })
    .concat(where_additions)
    .join(" AND ")

  if (condition) condition = `WHERE ${condition}`

  // convert fields to SELECT statement
  if (Array.isArray(fields) && fields.length) {
    fields = fields.join(", ")
  } else {
    fields = "*"
  }

  let rows = await mysqlPool.query(`SELECT ${fields} FROM leads ${condition}`)
  rows = rows.map(row => Object.assign({}, row)) // remove RowDataPacket class
  return rows
}

async function remove(id) {
  let status = await mysqlPool.query("DELETE FROM leads WHERE id = ?", id)
  return status.affectedRows != 0
}