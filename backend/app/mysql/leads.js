const mysqlPool = require("./mysql-pool")

module.exports = {
  insert, find, remove
}

async function insert(lead, lead_upload_id) {
  let status = await mysqlPool.query("INSERT INTO leads SET ?", lead)
  if (status.affectedRows != 0)
    if (lead_upload_id) 
      return lead_upload_id
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

  let rows = await mysqlPool.query(`SELECT ${fields} FROM leads ${condition}`)
  rows = rows.map(row => Object.assign({}, row)) // remove RowDataPacket class
  return rows
}

async function remove(id) {
  let status = await mysqlPool.query("DELETE FROM leads WHERE id = ?", id)
  return status.affectedRows != 0
}