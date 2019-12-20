import { log } from "util"

const mysql = require("mysql")
import * as _ from "lodash"

import SQL from "../mysql-pool/mysql-pool"
import LogModelActions from "../log-model-actions/log-model-actions"
import NotFound from "../../utils/not-found"

type tableName =
  | "users"
  | "leads"
  | "notifications"
  | "leads_history"
  | "transactions"
  | "auctions"
  | "bets"
  | "reviews"

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

  private convertRowToObject(row, customFields = []) {
    let convertRow = {
      ..._.omit(row, [this.fieldName].concat(customFields)),
    }

    if (row[this.fieldName]) {
      convertRow = {
        ...convertRow,
        ...JSON.parse(row[this.fieldName]),
      }
    }

    customFields.forEach(field => (convertRow[field] = JSON.parse(row[field])))
    return convertRow
  }

  //get conditions by auction status
  public getCndByStatuses(statuses = []) {
    const now = new Date().getTime()
    const ransomPeriodDuration = 172800000000 //2 days
    let conditions = []

    if (statuses.indexOf("active") !== -1)
      conditions.push(
        `( auctions.doc->>'$.endDate' > ${now} AND auctions.doc->>'$.isPast' = false )`,
      )
    if (statuses.indexOf("ransom") !== -1)
      conditions.push(
        `(auctions.doc->>'$.endDate' > ${now -
          ransomPeriodDuration} AND auctions.doc->>'$.isPast' = false )`,
      )
    if (statuses.indexOf("past") !== -1)
      conditions.push(`auctions.doc->>'$.isPast' = true`)

    return conditions.join(" OR ")
  }

  protected async getOne(whatever: any): Promise<IExisting | NotFound> {
    var result = await this.find(whatever)
    if (result.length != 1) {
      return new NotFound()
    } else {
      return result[0]
    }
  }

  protected prepareFilters(filters, table?): string {
    let tableStr = table ? `${table}.` : ""
    return filters
      .map(f => {
        const escaped = mysql.escape(f.val.toLowerCase())
        let field = f.field

        if (field.endsWith("[]")) {
          // find in array
          field = field.replace(/\[]$/, "")

          return `JSON_SEARCH(LOWER(${tableStr}${
            this.fieldName
          }->>${mysql.escape("$." + field)}), "one", ${escaped}) is not null`
        } else {
          // find string
          return `LOWER(${tableStr}${this.fieldName}->>${mysql.escape(
            "$." + field,
          )}) ${f.op} "%${escaped.slice(1, -1)}%"`
        }
      })
      .join(" OR ")
  }

  notificationsQueries = {
    markAsReadByIds: async ids => {
      let sql = `UPDATE leadcoin.notifications
      SET doc=JSON_set(doc,"$.unread",false)
      WHERE id in (${ids.join(",")})
       ;`
      let rows = await this.sql.query(sql)
      return rows
    },

    markAsRead: async user_id => {
      let sql = `UPDATE leadcoin.notifications
      SET doc=JSON_set(doc,"$.unread",false)
      WHERE doc->>"$.userId"=${user_id}
      AND doc->>"$.unread"="true";`
      let rows = await this.sql.query(sql)
      return rows
    },

    getUnreadNotificationsCount: async user_id => {
      let sql = `
      SELECT COUNT(id) as count
      FROM leadcoin.notifications
      WHERE doc->>"$.userId"=${user_id} 
      AND doc->>"$.unread"="true";`
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
    getOwnedLeads: async () => {
      let sql = `
      SELECT count(id) as cid
      FROM leadcoin.leads
      WHERE
          doc->>"$.ownerId" > 0
      AND doc->>"$.bought_from" > 0 
      ;`
      let rows = await this.sql.query(sql)
      return rows.map(r => r.cid)
    },
    getOwners: async () => {
      let sql = `
      SELECT DISTINCT doc->>"$.ownerId" as owner
      FROM leadcoin.leads
      WHERE
          doc->>"$.ownerId" > 0
      AND doc->>"$.bought_from" > 0 
      ;`
      let rows = await this.sql.query(sql)
      return rows.map(r => r.owner)
    },
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
      let where_additions = ""

      if (filters && filters.length) {
        where_additions = this.prepareFilters(filters)
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
      if (where_additions) query += `AND (${where_additions});`
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
      const { limit, filters, sort, user_id } = options
      let where_additions = []
      let search_additions = []
      if (filters.search) {
        where_additions.push(this.prepareFilters(filters.search))
      }
      if (filters.industry)
        where_additions.push(
          `${this.fieldName}->>'$.industry' = '${filters.industry}'`,
        )
      if (filters.category)
        where_additions.push(
          `${this.fieldName}->>'$.Category' = '${filters.category}'`,
        )
      if (search_additions.length)
        where_additions.push("(" + search_additions + ")")
      let limit_addition = ""
      let countHeader = "SELECT COUNT(*) as count "
      let realHeader = "SELECT *"

      if (sort) {
        realHeader += `\n, JSON_EXTRACT(${this.fieldName}, '$.${
          sort.sortBy
        }') AS ${sort.sortBy}`
      }

      let query = `\nFROM leads\nWHERE doc->>'$.active' = 'true'\nAND doc->>'$.forSale' = 'true'`
      if (user_id) query += `\nAND doc->>'$.ownerId' <> ${user_id} `
      if (where_additions.length)
        query += `\nAND ${where_additions.join(" AND ")}`
      if (filters.favorites) query += `\nAND id IN (${filters.favorites})`
      query += `\nAND id NOT IN (SELECT auctions.doc ->> '$.leadId' AS id FROM auctions WHERE ${this.getCndByStatuses(
        ["active", "ransom"],
      )})`

      let order = ""
      if (sort) {
        order = `\nORDER BY ${sort.sortBy} ${sort.sortOrder}`
      }
      if (limit) {
        limit_addition += `\nLIMIT ${limit.start},${limit.offset} `
      }
      let count = await this.sql.query(countHeader + query)
      let rows = await this.sql.query(
        realHeader + query + order + limit_addition,
      )
      rows = rows.map(row => this.convertRowToObject(row)) // remove RowDataPacket class
      rows = rows.map(row => {
        return Object.assign(row, {
          contact_person: "**********",
          email: "*********@gmail.com",
          telephone: row["telephone"].substring(0, 6) + "******",
        })
      }) // remove contact information
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
      if (where_additions.length) query += `AND ${where_additions}`
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
            return `leads.${this.fieldName} ->> ${mysql.escape(
              "$." + f.field,
            )} ${f.op} "%${escaped.slice(1, -1)}%"`
          })
          .join(" OR ")
      }
      let limit_addition = ""
      let countHeader = "SELECT COUNT(*) as count FROM leads"
      let realHeader = `SELECT leads.id, leads.doc, auctions.doc AS auction, auctions.id AS auctionId,
                        MAX(bets.doc ->> '$.price') AS auctionMaxBet, 
                        COUNT(bets.id) AS countBets
                        FROM leads 
                        LEFT JOIN auctions ON auctions.doc ->> '$.leadId' = leads.id 
                        AND (${this.getCndByStatuses(["active", "ransom"])})
                        LEFT JOIN bets ON bets.doc ->> '$.auctionId' = auctions.id`
      let query = `
        WHERE leads.doc->>"$.ownerId" = ${user_id}
        AND leads.doc->>"$.active" = "true" 
        AND leads.doc->>"$.forSale" = "true"
      `

      if (where_additions.length) query += `AND ${where_additions}`
      let queryCount = query
      query += " GROUP BY leads.id, auctions.id"
      if (sort) {
        query += ` ORDER BY leads.${this.fieldName} ->> ${mysql.escape(
          "$." + sort.sortBy,
        )} ${sort.sortOrder}`
      }
      if (limit) {
        limit_addition += ` LIMIT ${limit.start},${limit.offset} `
      }
      let count = await this.sql.query(countHeader + queryCount)
      let rows = await this.sql.query(realHeader + query + limit_addition)
      rows = rows.map(row => {
        let newRow = this.convertRowToObject(row, ["auction"])
        if (newRow.auction) {
          newRow.auction.id = newRow.auctionId
          newRow.auction.maxBet = newRow.maxBet =
            newRow.auctionMaxBet != null
              ? newRow.auctionMaxBet
              : newRow.auction.startPrice
          newRow.auction.countBets = newRow.countBets
        }
        delete newRow.auctionId
        delete newRow.auctionMaxBet
        delete newRow.countBets
        return newRow
      }) // remove RowDataPacket class
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
      if (where_additions.length) query += `AND ${where_additions} `
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

  auctionsQueries = {
    auctionsAndLeadGetAll: async (options: any) => {
      const { limit, filters, sort, userId } = options
      let where_additions = []
      let search_additions = []
      if (filters.search) {
        where_additions.push(this.prepareFilters(filters.search, "leads"))
      }
      if (filters.industry)
        where_additions.push(
          `leads.${this.fieldName}->>'$.industry' = '${filters.industry}'`,
        )
      if (filters.category)
        where_additions.push(
          `leads.${this.fieldName}->>'$.Category' = '${filters.category}'`,
        )
      if (search_additions.length)
        where_additions.push("(" + search_additions + ")")
      let limit_addition = ""
      let countHeader = "SELECT COUNT(*) as count "
      let realHeader =
        "SELECT auctions.id, auctions.doc, leads.doc AS lead, users.doc ->> '$.wallet' AS leadOwnerWallet "

      let query = `\nFROM auctions\nINNER JOIN leads ON auctions.doc ->> '$.leadId' = leads.id AND leads.doc->>'$.active' = 'true'\nAND leads.doc->>'$.forSale' = 'true'
                                  \nINNER JOIN users ON users.id = leads.doc ->> '$.ownerId'`
      query += `\nWHERE auctions.doc->>'$.creatorId' <> ${userId} `
      if (where_additions.length)
        query += `\nAND ${where_additions.join(" AND ")}`
      if (filters.favorites) query += `\nAND leads.id IN (${filters.favorites})`
      query += `\nAND (${this.getCndByStatuses([
        "active",
      ])} OR (${this.getCndByStatuses(["ransom"])} AND (
      SELECT id FROM bets 
      WHERE bets.doc->>'$.auctionsId' = auctions.id AND 
      bets.doc->>'$.userId' = ${userId} AND 
      bets.doc->>'$.price'= (
        SELECT JSON_UNQUOTE(MAX(bets.doc->'$.price')) FROM bets WHERE bets.doc->>'$.auctionsId' = auctions.id)
      ) IS NOT NULL))`
      let order = ""
      if (sort) {
        order = `\nORDER BY leads.doc->'$.${sort.sortBy}' ${sort.sortOrder}`
      }
      if (limit) {
        limit_addition += `\nLIMIT ${limit.start},${limit.offset} `
      }
      let count = await this.sql.query(countHeader + query)
      let rows = await this.sql.query(
        realHeader + query + order + limit_addition,
      )
      rows = rows.map(row => this.convertRowToObject(row, ["lead"])) // remove RowDataPacket class
      rows = rows.map(row => {
        let newRow = {
          ...row,
          lead: Object.assign(row.lead, {
            contact_person: "**********",
            email: "*********@gmail.com",
            telephone: row.lead["telephone"].substring(0, 6) + "******",
          }),
        }
        newRow.lead.ownerWallet = row.leadOwnerWallet
        delete newRow.leadOwnerWallet
        return newRow
      }) // remove contact information
      return { list: rows, total: count[0].count }
    },

    getCompletedAuctions: async () => {
      const query = `SELECT auctions.id, doc->>'$.leadId' AS leadId, doc->>'$.creatorId' AS creatorId
                     FROM auctions 
                     WHERE ${this.getCndByStatuses(["ransom"])} OR 
                     (${this.getCndByStatuses(["active"])} AND (
                      SELECT COUNT(*) FROM bets WHERE doc->>'$.auctionId' = auctions.id) = 0)`
      return await this.sql.query(query)
    },
  }

  betsQueries = {
    getMaxBetsPrice: async (auctionId: number) => {
      const query = `SELECT JSON_UNQUOTE(MAX(doc -> '$.price')) AS maxPrice FROM bets WHERE doc->>'$.auctionId' = ${auctionId}`
      const rows = await this.sql.query(query)
      return +rows[0]["maxPrice"]
    },
  }

  reviewsQueries = {
    getRatings: async (userId: number) => {
      const query = `SELECT doc->>'$.rating' AS rating FROM reviews WHERE doc->>'$.toUserId' = ${userId}`
      return await this.sql.query(query)
    },
  }

  /**
   *  If not found, not returing an error.
   */
  protected async find({
    condition,
    sort,
    limit,
    where,
    select,
  }: {
    condition?: ICondition
    sort?: { sortBy: string; sortOrder: "ASC" | "DESC" }
    limit?: { start: number; offset: number }
    where?: string
    select?: string
  }): Promise<IExisting[]> {
    let cnd = ""
    if (condition) {
      cnd = Object.keys(condition)
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
    }

    if (where) {
      cnd += cnd ? " AND " : ""
      cnd += where
    }
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
    let sql_query = `SELECT ${select || "*"} FROM ${
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
    let jsonSetStr = ""

    Object.keys(record).forEach(key => {
      let value = record[key]
      key = JSON.stringify(key)

      if (value && typeof value === "object") {
        value = `JSON_ARRAY(${value.map(mysql.escape).join(",")})`
      } else {
        value = mysql.escape(value)
      }

      jsonSetStr += `, ${mysql.escape("$." + key)}, ${value}`
    })

    let query = `UPDATE ${this.tableName} SET ${this.fieldName}=JSON_SET(${
      this.fieldName
    } ${jsonSetStr}) WHERE id = ${mysql.escape(id)}`

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
