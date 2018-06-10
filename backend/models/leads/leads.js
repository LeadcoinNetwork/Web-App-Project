const mysqlPool = require("../mysql-pool/mysql-pool")

module.exports = {
  insert,
  find,
  remove,
  update,
}

async function insert(lead) {
  let status = await mysqlPool.query("INSERT INTO leads SET ?", lead)
  return status.affectedRows != 0
}

async function update(_id, lead) {
  let status = await mysqlPool.query("UPDATE leads SET ? WHERE id = ?", [
    lead,
    _id,
  ])
  return status.affectedRows != 0
}

async function find(condition, fields, options) {
  condition = Object.keys(condition)
    .map(key => {
      return `${key} = '${condition[key]}'`
    })
    .concat(where_additions)
    .join(" AND ")

  if (condition) condition = `WHERE ${condition}`
  const { where_additions, sort_by } = options
  if (Array.isArray(fields) && fields.length) {
    fields = fields.join(", ")
  } else {
    fields = "*"
  }
  let sql = `SELECT ${fields} FROM leads ${condition}`
  if (Array.isArray(sort_by) && sort_by.length) {
    sql += ` ORDER BY ${sort_by[0]} ${sort_by[1]}`
  }
  console.log({ sql })
  let rows = await mysqlPool.query(sql)
  rows = rows.map(row => Object.assign({}, row))
  return rows
}

async function remove(id) {
  let status = await mysqlPool.query("DELETE FROM leads WHERE id = ?", id)
  return status.affectedRows != 0
}
