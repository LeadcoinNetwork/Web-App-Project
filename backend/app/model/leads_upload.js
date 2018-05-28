const db = require("../mysql")

module.exports = {
  insert, find, remove, update
}

async function insert(lead) {
  return await db.leads_upload.insert(lead)
}

async function update(lead) {
  return await db.leads_upload.update(lead.data_id, lead)
}

async function find(condition, fields) {
  return await db.leads_upload.find(condition, fields)
}

async function remove(batch_id, data_id) {
  return await db.leads_upload.remove(batch_id, data_id)
}