const mysqlPool = require("../mysql-pool/mysql-pool")

module.exports = {
  insert,
  find,
  remove,
  update,
}

async function insert(lead) {
  let status = await mysqlPool.query("INSERT INTO leads_upload SET ?", lead)
  return status.affectedRows != 0
}

async function update(data_id, lead) {
  let status = await mysqlPool.query(
    "UPDATE leads_upload SET ? WHERE data_id = ?",
    [lead, data_id],
  )
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

  let rows = await mysqlPool.query(
    `SELECT ${fields} FROM leads_upload ${condition}`,
  )
  rows = rows.map(row => Object.assign({}, row)) // remove RowDataPacket class
  return rows
}

async function remove(batch_id, data_id) {
  let status
  if (data_id)
    status = await mysqlPool.query(
      "DELETE FROM leads_upload WHERE data_id = ?",
      data_id,
    )
  else
    status = await mysqlPool.query(
      "DELETE FROM leads_upload WHERE batch_id = ?",
      batch_id,
    )
  return status.affectedRows != 0
}
