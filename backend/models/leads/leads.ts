
const mysqlPool = require("../mysql-pool/mysql-pool")

import { Lead } from "./types"
interface LeadsConstructor {}

interface FindOptions {
  sort_by?: [string, "ASC" |"DESC"]
  fields?: string[]
}

export default class Leads {
  constructor(props: LeadsConstructor) {
    Object.assign(this, props)
  }

  async deleteAll() {
    return mysqlPool.query("delete from leads")
  }

  async insert(lead: Lead) {
    let status = await mysqlPool.query("INSERT INTO leads SET ?", lead)
    return status.affectedRows != 0
  }

  async update(_id: number, lead: Lead) {
    let status = await mysqlPool.query("UPDATE leads SET ? WHERE id = ?", [
      lead,
      _id,
    ])
    return status.affectedRows != 0
  }

  async find(condition_obj: object, options: FindOptions | null | undefined) {
    let condition
    if (condition_obj) {
      let conditions = Object.keys(condition_obj).map(key => {
        return `${key} = '${condition_obj[key]}'`
      })
      condition = "WHERE " + conditions.join(" AND ")
    }
    let fields_str = "*"
    if (options && options.fields) {
      const {fields} = options
      if (Array.isArray(fields) && fields.length) {
        fields_str = fields.join(", ")
      }
    }
    let sql = `SELECT ${fields_str} FROM leads ${condition}`
    if (options && options.sort_by) {
      const {sort_by} = options
      if (Array.isArray(sort_by) && sort_by.length) {
        sql += ` ORDER BY ${sort_by[0]} ${sort_by[1]}`
      }
    }
    let rows = await mysqlPool.query(sql)
    rows = rows.map(row => Object.assign({}, row))
    return rows
  }

  async remove(id: number) {
    let status = await mysqlPool.query("DELETE FROM leads WHERE id = ?", id)
    return status.affectedRows != 0
  }
}