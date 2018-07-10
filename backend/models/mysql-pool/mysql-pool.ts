// external modules
const mysql = require("promise-mysql")

import { IConfig } from "../../app-logic/config"

interface queryResult extends Array<any> {
  insertId?: number
  affectedRows?: number
}

export default class SQL {
  private pool
  constructor(private config: IConfig) {
    this.pool = mysql.createPool(config.mysql)
    this.init()
    this.checkdb()
  }
  public query(...args): queryResult {
    var result = this.pool.query.apply(this.pool, arguments)
    return result
  }
  private async checkdb() {
    await this.query("select 1")
    if (this.config.env != "test") {
      console.log("Connected to mysql")
      console.log(
        "Attention: mysql-pool do not create schema anymore. instead you should execute /schema.sql. It will clear your database",
      )
    }
  }
  private init() {
    mysql
      .createConnection({
        host: this.config.mysql.host,
        port: this.config.mysql.port,
        user: this.config.mysql.user,
        password: this.config.mysql.password,
        database: "leadcoin",
      })
      .then(conn => {
        return conn.end()
      })
      .catch(err => {
        if (this.config.env != "test") {
          console.log("Failed to connect to mysql:", err.message)
        }
        setTimeout(this.init, 2000)
      })
  }
}
