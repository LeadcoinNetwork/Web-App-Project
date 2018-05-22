const mysqlPool = require("./mysql-pool")

module.exports = {
  insert
}

async function insert(lead) {
  let status = await mysqlPool.query("INSERT INTO leads SET ?", lead)
  return status.affectedRows != 0
}