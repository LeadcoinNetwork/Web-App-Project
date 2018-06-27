// external modules
const mysql = require("promise-mysql")

// internal modules
const config = require("../../app-logic/config")

module.exports = mysql.createPool(config.mysql)

async function checkdb() {
  await module.exports.query("select 1")
  if (config.env != "test") {
    console.log("Connected to mysql")
    console.log(
      "Attention: mysql-pool do not create schema anymore. instead you should execute /schema.sql. It will clear your database",
    )
  }
}
checkdb()
// initialize database
;(function init() {
  mysql
    .createConnection({
      host: config.mysql.host,
      port: config.mysql.port,
      user: config.mysql.user,
      password: config.mysql.password,
      database: "leadcoin",
    })
    .then(conn => {
      return conn.end()
    })
    .catch(err => {
      if (config.env != "test") {
        console.log("Failed to connect to mysql:", err.message)
      }
      setTimeout(init, 2000)
    })
})()
