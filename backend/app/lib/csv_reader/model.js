const db = require("./mysql")

module.exports = {
  insert
}

async function insert(user) {
  return await db.insert(user)
}