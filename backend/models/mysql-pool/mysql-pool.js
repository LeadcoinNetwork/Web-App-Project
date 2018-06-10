// external modules
const mysql = require("promise-mysql")

// internal modules
const config = require("../../config")

module.exports = mysql.createPool(config.mysql)

// initialize database
;(function init() {
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

      conn.query("CREATE DATABASE IF NOT EXISTS " + config.mysql.database)
      conn.query("USE " + config.mysql.database)
      conn.query(`CREATE TABLE IF NOT EXISTS users (
        id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        provider_id VARCHAR(40),
        provider VARCHAR(40),
        password VARCHAR(60),
        email VARCHAR(254) NOT NULL UNIQUE,
        role VARCHAR(255) DEFAULT 'user',
        fname VARCHAR(40) NOT NULL,
        lname VARCHAR(40) NOT NULL,
        company VARCHAR(40),
        country VARCHAR(40),
        phone VARCHAR(40),
        created BIGINT,
        access BIGINT,
        login BIGINT,
        disabled VARCHAR(40)
      )`)

      conn.query(`CREATE TABLE IF NOT EXISTS tokens (
        user_id INT(10) UNSIGNED PRIMARY KEY,
        token VARCHAR(60),
        pending_email VARCHAR(254) UNIQUE,
        created BIGINT,
        FOREIGN KEY (user_id) REFERENCES users(id)
          ON DELETE CASCADE
      )`)

      return conn.end()
    })
    .catch(err => {
      if (config.env != "test") {
        console.log("Failed to connect to mysql:", err.message)
      }
      setTimeout(init, 2000)
    })
})()
