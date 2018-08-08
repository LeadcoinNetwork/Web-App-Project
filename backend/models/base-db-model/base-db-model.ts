const mysql = require("mysql")
import * as _ from "lodash"

import SQL from "../mysql-pool/mysql-pool"
import LogModelActions from "../log-model-actions/log-model-actions"
import NotFound from "../../utils/not-found"

type tableName = "users" | "leads" | "notifications"

const private_fields = ["name", "phone"]

export default abstract class BaseDBModel<INew, IExisting, ICondition> {
  fieldName = "doc"
  log = LogModelActions(this.tableName)

  constructor(protected sql: SQL, public readonly tableName: tableName) {}

  async deleteAll() {
    return this.sql.query("delete from " + this.tableName)
  }
  protected async tryGetById(id): Promise<IExisting | NotFound> {
    let user = await this.getOne(<any>{ condition: { id } }) // 'any' becuase ICondition it's a generic interface.
    return user
  }

  protected async exist(condition: ICondition): Promise<boolean> {
    var result = await this.find({ condition })
    return result.length > 0
  }

  private convertRowToObject(row) {
    return {
      ..._.omit(row, this.fieldName),
      ...JSON.parse(row[this.fieldName]),
    }
  }
  protected async getOne(whatever: any): Promise<IExisting | NotFound> {
    var result = await this.find(whatever)
    if (result.length != 1) {
      return new NotFound()
    } else {
      return result[0]
    }
  }

  notificationsQueries = {
    markAsReadByIds: async ids => {
      let sql = `UPDATE leadcoin.notifications
      SET doc=JSON_set(doc,"$.unread","false")
      WHERE id in (${ids.join(",")})
       ;`
      let rows = await this.sql.query(sql)
      return rows
    },

    markAsRead: async user_id => {
      let sql = `UPDATE leadcoin.notifications
      SET doc=JSON_set(doc,"$.unread","false")
      WHERE doc->>"$.userId"=${user_id}
      AND doc->>"$.unread"= "true"
       ;`
      let rows = await this.sql.query(sql)
      return rows
    },

    getUnreadNotificationsCount: async user_id => {
      let sql = `
      SELECT COUNT(id) as count
      FROM leadcoin.notifications
      WHERE doc->>"$.userId"=${user_id} 
      AND doc->>"$.unread"= "true"
      ;`
      let rows = await this.sql.query(sql)
      return rows[0].count
    },

    getNotificationsByUserId: async user_id => {
      let sql = `SELECT * 
      FROM leadcoin.notifications
      WHERE doc->>"$.userId"=${user_id} 
      ORDER BY id desc;`
      let rows = await this.sql.query(sql)
      rows = rows.map(row => this.convertRowToObject(row)) // remove RowDataPacket class
      return rows
    },
  }

  leadsQueries = {
    getMockLeads: async user_id => {
      let sql = `
      SELECT id
      FROM leadcoin.leads
      WHERE doc->>"$.meta.mock" = "true"
      AND doc->>"$.ownerId" = ${user_id}
      AND doc->>"$.active" = "true" 
      AND doc->>"$.forSale" = "true"
      ;`
      let rows = await this.sql.query(sql)
      return rows.map(r => r.id)
    },
    getDealPrice: async lead_ids => {
      if (lead_ids.length === 0) return 0
      let sql = `
        SELECT SUM(doc->>"$.lead_price") as lp
        FROM leadcoin.leads
        WHERE id IN (${lead_ids.join(",")}) 
        ;`
      let rows = await this.sql.query(sql)
      return rows[0].lp
    },

    getLeadFields: async lead_type => {
      let sql = `SELECT * FROM leadcoin.leads WHERE doc->>"$.type"="${mysql.escape(
        lead_type,
      )}" limit 1;`
      let rows = await this.sql.query(sql)
      rows = rows.map(row => this.convertRowToObject(row)) // remove RowDataPacket class
      return Object.keys(rows)
    },

    getBoughtLeads: async (user_id: number, options: any) => {
      const { limit, filters, sort } = options
      let where_additions = []
      if (filters) {
        where_additions = filters
          .map(f => {
            const escaped = mysql.escape(f.val)
            return `${this.fieldName} ->> "$.${f.field}" ${
              f.op
            } "%${escaped.slice(1, -1)}%"`
          })
          .join(" OR ")
      }
      let limit_addition = ""
      let countHeader = "SELECT COUNT(*) as count "
      let realHeader = "SELECT * "
      let query = `
        FROM leads
        WHERE doc->>"$.ownerId" = ${user_id}
        AND doc->>"$.active" = "true" 
        AND doc->>"$.bought_from" > 0
        AND doc->>"$.forSale" = "false"
      `
      if (where_additions.length > 0) query += `AND ${where_additions};`
      if (sort) {
        query += ` ORDER BY ${this.fieldName} ->> ${mysql.escape(
          "$." + sort.sortBy,
        )} ${sort.sortOrder}`
      }
      if (limit) {
        limit_addition += ` LIMIT ${limit.start},${limit.offset} `
      }
      let count = await this.sql.query(countHeader + query)
      let rows = await this.sql.query(realHeader + query + limit_addition)
      rows = rows.map(row => this.convertRowToObject(row)) // remove RowDataPacket class
      return { list: rows, total: count[0].count }
    },

    buyLeadsGetAll: async (options: any) => {
      const { limit, filters, sort } = options
      let where_additions = []
      if (filters) {
        where_additions = filters
          .map(f => {
            const escaped = mysql.escape(f.val)
            return `${this.fieldName} ->> "$.${f.field}" ${
              f.op
            } "%${escaped.slice(1, -1)}%"`
          })
          .join(" OR ")
      }
      let limit_addition = ""
      let countHeader = "SELECT COUNT(*) as count "
      let realHeader = "SELECT *"
      let query = `
        FROM leads
        WHERE doc->>"$.active" = "true"
        AND doc->>"$.forSale" = "true" 
      `
      if (where_additions.length > 0) query += `AND ${where_additions}`
      if (sort) {
        query += ` ORDER BY ${this.fieldName} ->> ${mysql.escape(
          "$." + sort.sortBy,
        )} ${sort.sortOrder}`
      }
      if (limit) {
        limit_addition += ` LIMIT ${limit.start},${limit.offset} `
      }
      let count = await this.sql.query(countHeader + query)
      let rows = await this.sql.query(realHeader + query + limit_addition)
      rows = rows.map(row => this.convertRowToObject(row)) // remove RowDataPacket class
      return { list: rows, total: count[0].count }
    },

    getMyLeads: async (user_id: number, options: any) => {
      const { limit, filters, sort } = options
      let where_additions = []
      if (filters) {
        where_additions = filters
          .map(f => {
            const escaped = mysql.escape(f.val)
            return `${this.fieldName} ->> "$.${f.field}" ${
              f.op
            } "%${escaped.slice(1, -1)}%"`
          })
          .join(" OR ")
      }
      let limit_addition = ""
      let countHeader = "SELECT COUNT(*) as count "
      let realHeader = "SELECT *"
      let query = `
        FROM leads
        WHERE doc->>"$.ownerId" = ${user_id}
        AND doc->>"$.active" = "true" 
        AND doc->>"$.forSale" = "false"
      `
      if (where_additions.length > 0) query += `AND ${where_additions}`
      if (sort) {
        query += ` ORDER BY ${this.fieldName} ->> ${mysql.escape(
          "$." + sort.sortBy,
        )} ${sort.sortOrder}`
      }
      if (limit) {
        limit_addition += ` LIMIT ${limit.start},${limit.offset} `
      }
      let count = await this.sql.query(countHeader + query)
      let rows = await this.sql.query(realHeader + query + limit_addition)
      rows = rows.map(row => this.convertRowToObject(row)) // remove RowDataPacket class
      return { list: rows, total: count[0].count }
    },

    getMyLeadsForSale: async (user_id: number, options: any) => {
      const { limit, filters, sort } = options
      let where_additions = []
      if (filters) {
        where_additions = filters
          .map(f => {
            const escaped = mysql.escape(f.val)
            return `${this.fieldName} ->> "$.${f.field}" ${
              f.op
            } "%${escaped.slice(1, -1)}%"`
          })
          .join(" OR ")
      }
      let limit_addition = ""
      let countHeader = "SELECT COUNT(*) as count "
      let realHeader = "SELECT *"
      let query = `
        FROM leads
        WHERE doc->>"$.ownerId" = ${user_id}
        AND doc->>"$.active" = "true" 
        AND doc->>"$.forSale" = "true"
      `
      if (where_additions.length > 0) query += `AND ${where_additions}`
      if (sort) {
        query += ` ORDER BY ${this.fieldName} ->> ${mysql.escape(
          "$." + sort.sortBy,
        )} ${sort.sortOrder}`
      }
      if (limit) {
        limit_addition += ` LIMIT ${limit.start},${limit.offset} `
      }
      let count = await this.sql.query(countHeader + query)
      let rows = await this.sql.query(realHeader + query + limit_addition)
      rows = rows.map(row => this.convertRowToObject(row)) // remove RowDataPacket class
      return { list: rows, total: count[0].count }
    },

    getSoldLeads: async (user_id: number, options: any) => {
      const { limit, filters, sort } = options
      let where_additions = []
      if (filters) {
        where_additions = filters
          .map(f => {
            return `${this.fieldName} ->> "$.${f[0]}" LIKE "%${f[1]}%"`
          })
          .join(" AND ")
      }
      let query = `
        SELECT *
        FROM leads
        WHERE doc->>"$.bought_from" = ${user_id}
        AND doc->>"$.active" = "true" 
      `
      if (where_additions.length > 0) query += `AND ${where_additions} `
      if (sort) {
        query += ` ORDER BY ${this.fieldName} ->> ${mysql.escape(
          "$." + sort.sortBy,
        )} ${sort.sortOrder}`
      }
      let rows = await this.sql.query(query)
      rows = rows.map(row => this.convertRowToObject(row)) // remove RowDataPacket class
      return rows
    },
  }

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
    var cnd = Object.keys(condition)
      .map(key => {
        var field
        switch (key) {
          case "id":
            field = "id"
            break

          default:
            field = `${this.fieldName} ->> ${mysql.escape("$." + key)}`
            break
        }
        let val = condition[key]
        if (typeof val == "boolean") {
          val = "" + val + ""
        }
        return `${field} = ${mysql.escape(condition[key])}`
      })
      .join(" AND ")

    if (cnd) cnd = `WHERE ${cnd}`
    let sql_sort = ""
    let sql_limit = ""
    if (sort) {
      sql_sort = ` ORDER BY ${this.fieldName} ->> ${mysql.escape(
        "$." + sort.sortBy,
      )} ${sort.sortOrder}`
    }
    if (limit) {
      sql_limit = ` LIMIT ${limit.start},${limit.offset} `
    }
    let sql_query = `SELECT * FROM ${
      this.tableName
    } ${cnd} ${sql_sort} ${sql_limit} ;`
    let rows = await this.sql.query(sql_query)
    rows = rows.map(row => this.convertRowToObject(row)) // remove RowDataPacket class
    return rows
  }

  protected async insert(record: INew) {
    this.log("create " + this.tableName + " start", record)

    let status = await this.sql.query(
      `INSERT INTO ${this.tableName} SET ${this.fieldName}=${mysql.escape(
        JSON.stringify(record),
      )}`,
    )

    this.log("create " + this.tableName + " ends", status.insertId)

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
    /*
     update user set user=JSON_set(user,"$.name","new name","$.telephone","123")
    */

    this.log("update " + this.tableName + " start", record)
    var str = ""
    var values = Object.keys(record).forEach(key => {
      str += `, ${mysql.escape("$." + key)} , ${mysql.escape(record[key])}`
    })

    var query = `UPDATE ${this.tableName} SET ${this.fieldName}=JSON_SET(${
      this.fieldName
    } ${str})   WHERE id = ${mysql.escape(id)}`

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
