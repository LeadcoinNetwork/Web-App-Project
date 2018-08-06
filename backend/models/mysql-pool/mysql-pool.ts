// external modules
const mysql = require("promise-mysql")

import { IConfig } from "../../app-logic/config"
import LogModelAction from "../log-model-actions/log-model-actions"

interface queryResult extends Array<any> {
  insertId?: number
  affectedRows?: number
  changedRows?: number
}

export default class SQL {
  private log = LogModelAction("sql")
  private pool
  constructor(private config: IConfig) {
    this.pool = mysql.createPool(config.mysql)
    this.init()
    this.checkdb()
  }
  public loggedQuery(...args): queryResult {
    var result = this.pool.query.apply(this.pool, arguments)
    return result
  }
  public async query(...args): Promise<queryResult> {
    var query = mysql.format(...args)
    if (query.includes("NaN")) {
      console.log(query)
    }
    try {
      var result = await this.pool.query(query)
    } catch (err) {
      this.log("query", { error: err.message, query })
      throw err
    }
    this.log("query", { query, result })
    return result
  }
  private async checkdb() {
    await this.query("select 1")
    if (this.config.env != "test") {
      console.log("Connected to mysql")
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
