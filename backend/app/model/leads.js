const db = require("../mysql")

module.exports = {
  insert, find, remove
}

async function insert(lead) {
  return await db.leads.insert(lead)
}

async function find(condition, fields) {
  return await db.leads.find(condition, fields)
}

async function remove(batchId) {
  return await db.leads.remove(batchId)
}
