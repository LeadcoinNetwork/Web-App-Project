const config = require("../../config")
const mysql = require("promise-mysql")

module.exports = mysql.createPool(config.mysql);

// initialize database
(function init() {
  mysql
    .createConnection({
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password
    })
    .then(conn => {
      if (config.env != "test") {
        console.log("Connected to mysql")
      }
      return conn.end()
    })
    .catch(err => {
      if (config.env != "test") {
        console.log("Failed to connect to mysql:", err.message)
      }
      setTimeout(init, 2000)
    })
})()
