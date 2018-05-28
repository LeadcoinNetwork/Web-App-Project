const db = require("../mysql")

module.exports = {
  insert, find, remove, update
}

async function insert(lead) {
  return await db.leads.insert(lead)
}

async function update(lead) {
  return await db.leads.update(lead.id, lead)
}

async function find(condition, fields, where_additions) {
  return await db.leads.find(condition, fields, where_additions)
}

async function remove(batchId) {
  return await db.leads.remove(batchId)
}
