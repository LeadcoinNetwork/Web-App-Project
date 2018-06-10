const config = require("../../app/config")
const { mysqlPool } = require("../../app/mysql")
const server = require("../../app/server")

after(async () => {
  // close open connections and allow mocha process to end
  server.close()
  await mysqlPool.query("DROP DATABASE " + config.mysql.database)
  await mysqlPool.end()
})

afterEach(async () => {
  await mysqlPool.query("DELETE FROM users")
})
