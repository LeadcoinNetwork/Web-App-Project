const mysql = require("mysql")

import SQL from "../mysql-pool/mysql-pool"
import LogModelActions from "../log-model-actions/log-model-actions"
import NotFound from "../../utils/not-found"

type tableName = "users" | "leads"
type SAFE_AND_SANITIZED_SQL_QUERY = string

export default abstract class BaseDBModel<INew, IExisting, ICondition> {
  log = LogModelActions(this.tableName)

  constructor(protected sql: SQL, public readonly tableName: tableName) {}

  async deleteAll() {
    return this.sql.query("delete from " + this.tableName)
  }
  protected async tryGetById(id): Promise<IExisting | NotFound> {
    let user = await this.getOne(<any>{ id }) // 'any' becuase ICondition it's a generic interface.
    return user
  }

  protected async exist(condition: ICondition): Promise<boolean> {
    var result = await this.find(condition)
    return result.length > 0
  }

  protected async getOne(
    condition: ICondition,
    settings: { returnPassword: boolean } = { returnPassword: false },
  ): Promise<IExisting | NotFound> {
    var result = await this.find({ condition })
    if (result.length != 1) {
      return new NotFound()
    } else {
      return result[0]
    }
  }

  // TODO @erez Ensure change all fucntion to pretected. (And make sure applogic do not use it...)
  // TODO @erez Change call to user.find to this signature (tests...)
  /**
   *  If not found, not returing an error.
   */
  protected async find({
    condition,
    sort,
    limit,
  }: {
    condition?: ICondition
    sort?: { sortBy: string; sortOrder: "ASC" | "DESC" }
    limit?: { start: number; offset: number }
  }): Promise<IExisting[]> {
    console.log({ condition })
    var cnd = Object.keys(condition)
      .map(key => {
        return `${mysql.escapeId(key)} = ${mysql.escape(condition[key])}`
      })
      .join(" AND ")

    if (cnd) cnd = `WHERE ${cnd}`
    let sql_sort = ""
    let sql_limit = ""
    if (sort) {
      sql_sort = ` ORDER BY ${sort.sortBy} ${sort.sortOrder}`
    }
    if (limit) {
      sql_limit = ` LIMIT ${limit.start},${limit.offset} `
    }
    let rows = await this.sql.query(
      `SELECT * FROM ${this.tableName} ${cnd} ${sql_sort} ${sql_limit} ;`,
    )
    return rows
  }

  protected async query(query: SAFE_AND_SANITIZED_SQL_QUERY) {
    this.log("executing query on ", this.tableName)
    this.log("query is:", query)
    let status = await this.sql.query(query)
    this.log("query results: ", JSON.stringify(status))
    return status
  }

  protected async insert(record: INew) {
    this.log("create " + this.tableName + " start", record)

    let status = await this.sql.query(
      "INSERT INTO " + this.tableName + " SET ?",
      record,
    )

    this.log("create " + this.tableName + " start", status.insertId)

    return status
  }
  protected async deleteIfExist(id): Promise<boolean> {
    let status = await this.sql.query(
      "DELETE FROM " + this.tableName + " WHERE id = ?",
      id,
    )
    return status.affectedRows != 0
  }

  protected async update(id, record) {
    this.log("update " + this.tableName + " start", record)
    var values = Object.keys(record)
      .map(key => {
        return `${mysql.escapeId(key)} = ${mysql.escape(record[key])}`
      })
      .join(" , ")

    var query = `UPDATE ${
      this.tableName
    } SET ${values}  WHERE id = ${mysql.escape(id)}`

    let status = await this.sql.query(query)
    if (status.affectedRows == 0) {
      this.log("record not updated end", record)
      throw new Error("record not updated")
    } else {
      this.log("record updated end", record)
      return true
    }
  }
}
