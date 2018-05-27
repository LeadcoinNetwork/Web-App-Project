const db = require("../mysql")

module.exports = {
  insert, find, remove
}

async function insert(user) {
  return await db.leads_upload.insert(user)
}

async function find(condition, fields) {
  return await db.leads_upload.find(condition, fields)
}

async function remove(batchId) {
  return await db.leads_upload.remove(batchId)
}
