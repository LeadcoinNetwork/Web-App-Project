
import SQL from '../mysql-pool/mysql-pool'

import { Lead } from "./types"

export interface FindOptions {
  sort_by?: [string, "ASC" |"DESC"]
  fields?: string[]
  page?: number
  where_additions?: string[]
  limit?: number
}

export default class Leads {
  constructor(private sql: SQL) {}

  async deleteAll() {
    return this.sql.query("delete from leads")
  }

  async addWithNewOwner(lead_id: number, new_owner: number) {
    const lead = await this.getById(lead_id)
    lead.bought_from = lead.owner_id
    lead.owner_id = new_owner
    const [succ, _id] =  await this.insert(lead)
    return _id
  }

  async buy(leads: number[], new_owner: number) {
    // try to make leads inactive, in case of race condition
    const inactive_leads = await leads.filter(async (l_id) => {
      return await this.update(l_id, {active: false})
    })

    // insert the leads as new after a change ownership
    return inactive_leads.map(async (l_id:number) => { 
      return await this.addWithNewOwner(l_id, new_owner)
    })
  }

  async getById(id: number): Promise<Lead> {
    const [record] = await this.find({id}, null)
    return record
  }

  async insert(lead: Lead) {
    let status = await this.sql.query("INSERT INTO leads SET ?", lead)
    const success = (status.affectedRows != 0)
    if (!success) {
      throw new Error("Lead not added")
    }
    return [success, (success) ? status.insertId : null]
  }

  async update(_id: number, lead: Lead) {
    let status = await this.sql.query("UPDATE leads SET ? WHERE id = ?", [
      lead,
      _id,
    ])
    return status.affectedRows != 0
  }

  async find(condition_obj: object, options: FindOptions | null) {
    if (!options) options = {}
    const {where_additions, sort_by, fields, page, limit} = options
    let conditions = Object.keys(condition_obj).map(key => {
      return `${key} = '${condition_obj[key]}'`
    })
    if (where_additions) {
      conditions = conditions.concat(where_additions)
    }
    let condition = "WHERE " + conditions.join(" AND ")
    let fields_str = "*"
    if (fields) {
      if (Array.isArray(fields) && fields.length) {
        fields_str = fields.join(", ")
      }
    }
    let sql = `SELECT ${fields_str} FROM leads ${condition}`
    if (sort_by) {
      if (Array.isArray(sort_by) && sort_by.length) {
        sql += ` ORDER BY ${sort_by[0]} ${sort_by[1]}`
      }
    }
    if (limit) {
      let sqlLimit = (limit < 100) ? limit : 100
      let limitBoundry = page * limit
      sql += ` LIMIT ${limitBoundry},${sqlLimit}`
    }
    //console.log({sql})
    let rows = await this.sql.query(sql)
    rows = rows.map(row => Object.assign({}, row))
    //console.log({rows})
    return rows
  }

  async remove(id: number) {
    let status = await this.sql.query("DELETE FROM leads WHERE id = ?", id)
    return status.affectedRows != 0
  }
}