const mysql = require("mysql")

import SQL from "../mysql-pool/mysql-pool"
import LogModelActions from "../log-model-actions/log-model-actions"
import NotFound from "../../utils/not-found"

type tableName = "users" | "leads"

export default abstract class BaseDBModel<INew, IExisting, ICondition> {
  log = LogModelActions(this.tableName)

  constructor(protected sql: SQL, public readonly tableName: tableName) {}

  async deleteAll() {
    return this.sql.query("delete from " + this.tableName)
  }
  public async tryGetById(id): Promise<IExisting | NotFound> {
    let user = await this.getOne(<any>{ id }) // 'any' becuase ICondition it's a generic interface.
    return user
  }

  public async exist(condition: ICondition): Promise<boolean> {
    var result = await this.find(condition)
    return result.length > 0
  }

  public async getOne(
    condition: ICondition,
    settings: { returnPassword: boolean } = { returnPassword: false },
  ): Promise<IExisting | NotFound> {
    var result = await this.find(condition, settings)
    if (result.length != 1) {
      return new NotFound()
    } else {
      return result[0]
    }
  }

  // If not found, not returing an error.
  public async find(
    condition: ICondition,
    settings: { returnPassword: boolean } = { returnPassword: false },
  ): Promise<IExisting[]> {
    var cnd = Object.keys(condition)
      .map(key => {
        return `${mysql.escapeId(key)} = ${mysql.escape(condition[key])}`
      })
      .join(" AND ")

    if (cnd) cnd = `WHERE ${cnd}`

    let rows = await this.sql.query(`SELECT * FROM ${this.tableName} ${cnd}`)
    rows = rows.map(row => {
      // remove RowDataPacket class
      var newObject = Object.assign({}, row)
      if (!settings.returnPassword) {
        delete newObject.password
      }
      return newObject
    })
    return rows
  }

  public async insert(record: INew) {
    this.log("create " + this.tableName + " start", record)

    let status = await this.sql.query("INSERT INTO "+this.tableName+" SET ?", record)

    this.log("create " + this.tableName + " start", status.insertId)

    return status
  }
  public async deleteIfExist(id): Promise<boolean> {
    let status = await this.sql.query(
      "DELETE FROM " + this.tableName + " WHERE id = ?",
      id,
    )
    return status.affectedRows != 0
  }

  public async update(id, record) {
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
